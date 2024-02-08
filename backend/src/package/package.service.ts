import { Injectable } from '@nestjs/common';
import { CreatePackageDto, Route } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma.service';
import { setFips } from 'crypto';
import { getPackageStatus } from './utils/getPackageStatus';
import { genTrackingNumber } from './utils/genTrackingNumber';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}
  async create(
    parcel_data: Exclude<CreatePackageDto, 'route'>,
    route_data: Route,
  ) {
    const { receiver_email = '', comment = '', ...data } = parcel_data;
    return await this.prisma.package.create({
      data: {
        ...data,
        receiver_email,
        comment,
        tracking_id: genTrackingNumber(),
        route: {
          create: {
            steps: {
              createMany: {
                data: route_data.steps,
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    const parcels = await this.prisma.package.findMany({
      include: {
        route: {
          include: {
            steps: true,
          },
        },
      },
    });

    return parcels.map((p) => ({
      name: p.name,
      tracking_number: p.tracking_number,
      tracking_id: p.tracking_id,
      status: getPackageStatus(p),
    }));
  }

  async findOne(id: string) {
    const res = await this.prisma.package.findFirst({
      where: { tracking_number: id },
      include: {
        route: {
          include: {
            steps: true,
          },
        },
      },
    });
    const status = getPackageStatus(res);
    return { ...res, status };
  }

  async findOnePublic(id: string) {
    const res = await this.prisma.package.findFirst({
      where: { tracking_id: id },
      include: {
        route: {
          include: {
            steps: {
              orderBy: {
                timeout: 'asc',
              },
            },
          },
        },
      },
    });
    const status = getPackageStatus(res);
    return { ...res, status };
  }

  async update(
    id: string,
    updatePackageDto: Exclude<UpdatePackageDto, 'route'>,
    route_data: Route,
  ) {
    delete (updatePackageDto as any).routeId;

    route_data.steps.forEach((st) => {
      delete st.routeId;
    });

    //delete all route steps
    const p1 = await this.prisma.package.update({
      where: { tracking_number: id },
      data: {
        ...updatePackageDto,
        route: {
          update: {
            steps: {
              deleteMany: {},
            },
          },
        },
      },
    });

    //recreate route steps
    const p3 = await this.prisma.package.update({
      where: { tracking_number: id },
      include: {
        route: {
          include: {
            steps: true,
          },
        },
      },
      data: {
        route: {
          update: {
            steps: {
              createMany: {
                data: route_data.steps.map((d) => ({ ...d })),
                skipDuplicates: true,
              },
            },
          },
        },
      },
    });

    return p3;
  }

  async remove(id: string) {
    const res = await this.prisma.package.delete({
      where: { tracking_number: id },
    });

    const res1 = await this.prisma.route.delete({
      where: { id: res.routeId },
    });

    return res;
  }
}
