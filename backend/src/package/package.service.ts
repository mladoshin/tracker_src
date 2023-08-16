import { Injectable } from '@nestjs/common';
import { CreatePackageDto, Route } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma.service';
import { setFips } from 'crypto';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}
  async create(
    parcel_data: Exclude<CreatePackageDto, 'route'>,
    route_data: Route,
  ) {
    return await this.prisma.package.create({
      data: {
        ...parcel_data,
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
    return await this.prisma.package.findMany({
      select: {
        name: true,
        tracking_number: true,
        status: true,
        start_date: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.package.findFirst({
      where: { tracking_number: id },
      include: {
        route: {
          include: {
            steps: true,
          },
        },
      },
    });
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
