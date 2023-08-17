import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RouteService {
  constructor(private prisma: PrismaService) {}

  async create(createRouteDto: CreateRouteDto) {
    return await this.prisma.routePreset.create({
      data: {
        name: createRouteDto.name,
        steps: JSON.stringify(createRouteDto.steps),
      },
    });
  }

  async findAll() {
    return await this.prisma.routePreset.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.routePreset.findFirst({ where: { id: id } });
  }

  async update(id: string, updateRouteDto: UpdateRouteDto) {
    return await this.prisma.routePreset.update({
      where: { id: id },
      data: {
        name: updateRouteDto.name,
        steps: JSON.stringify(updateRouteDto.steps),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.routePreset.delete({ where: { id: id } });
  }
}
