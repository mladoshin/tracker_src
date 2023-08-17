import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { RouteStep } from 'src/package/dto/create-package.dto';
import { GetRouteDto } from './dto/get-route.dto';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const preset = await this.routeService.create(createRouteDto);
    const steps: RouteStep[] = JSON.parse(preset.steps as string);
    const count = steps.length;
    return {
      ...preset,
      from: steps[0]?.name,
      to: steps[count - 1]?.name,
      steps,
    };
  }

  @Get()
  async findAll() {
    const res = await this.routeService.findAll();
    return res.map((r) => {
      const steps: RouteStep[] = JSON.parse(r.steps as string);
      const count = steps.length;
      return {
        ...r,
        from: steps[0]?.name,
        to: steps[count - 1]?.name,
        steps,
      };
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const preset = await this.routeService.findOne(id);
    const steps: RouteStep[] = JSON.parse(preset.steps as string);
    const count = steps.length;
    return {
      ...preset,
      from: steps[0]?.name,
      to: steps[count - 1]?.name,
      steps,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRouteDto: UpdateRouteDto,
  ) {
    const preset = await this.routeService.update(id, updateRouteDto);
    const steps: RouteStep[] = JSON.parse(preset.steps as string);
    const count = steps.length;
    return {
      ...preset,
      from: steps[0]?.name,
      to: steps[count - 1]?.name,
      steps,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(id);
  }
}
