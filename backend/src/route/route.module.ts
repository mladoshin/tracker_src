import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RouteController],
  providers: [RouteService, PrismaService],
})
export class RouteModule {}
