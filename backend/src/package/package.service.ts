import { Injectable } from '@nestjs/common';
import { CreatePackageDto, Route } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PrismaService } from 'src/prisma.service';

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

  findAll() {
    return `This action returns all package`;
  }

  findOne(id: number) {
    return `This action returns a #${id} package`;
  }

  async update(
    id: string,
    updatePackageDto: Exclude<UpdatePackageDto, 'route'>,
    route_data: Route,
  ) {
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
              connectOrCreate: route_data.steps.map((d) => ({
                where: { name: d.name },
                create: { ...d },
              })),
            },
          },
        },
      },
    });

    return p3;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}
