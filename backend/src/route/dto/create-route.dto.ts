import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { RouteStep } from 'src/package/dto/create-package.dto';

export class CreateRouteDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RouteStep)
  steps: RouteStep[];
}
