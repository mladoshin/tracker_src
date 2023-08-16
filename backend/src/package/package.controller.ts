import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  //@UseGuards(AuthGuard)
  @Post()
  create(@Body() createPackageDto: CreatePackageDto) {
    const route_data = { ...createPackageDto.route };
    const parcel_data: Exclude<CreatePackageDto, 'route'> = {
      ...createPackageDto,
    };

    delete parcel_data.route;
    delete (parcel_data as any).tracking_number;

    return this.packageService.create(parcel_data, route_data);
  }

  @Get()
  findAll() {
    return this.packageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.packageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    const route_data = { ...updatePackageDto.route };
    const parcel_data: Exclude<UpdatePackageDto, 'route'> = {
      ...updatePackageDto,
    };
    delete (parcel_data as any).routeId;

    delete parcel_data.route;
    console.log('update');
    return this.packageService.update(id, parcel_data, route_data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageService.remove(+id);
  }
}
