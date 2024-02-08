import { Exclude } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
export class CreatePackageDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNumber({ allowInfinity: false }, { message: 'Вес должен быть числом' })
  weight: number;

  @IsString()
  sender_name: string;

  mode: string;
  payment_mode: string;
  carrier: string;

  @IsOptional()
  @IsString()
  destination: string;

  status: string;

  @IsDateString({}, { message: 'Некорректная дата доставки' })
  expected_delivery_date: Date;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  shipment: string;

  @IsString()
  receiver_name: string;

  @IsOptional()
  @IsString()
  receiver_phone: string;

  @IsOptional()
  @IsString()
  //@IsEmail()
  receiver_email?: string;

  @IsOptional()
  @IsString()
  //@IsNotEmpty({ message: 'Адрес адресата не может быть пустым' })
  receiver_address: string;

  @IsOptional()
  @IsString()
  //@IsNotEmpty({ message: 'Начальный адрес не может быть пустым' })
  start_address: string;

  @IsOptional()
  @IsString()
  start_date: Date;

  route: Route;
}

export class Route {
  @IsArray({ message: 'Шаги должны быть массивом' })
  @ArrayNotEmpty({ message: 'Массив шагов не может быть пустым' })
  steps: RouteStep[];
}

export class GetRoute {
  id: string;
  @IsArray({ message: 'Шаги должны быть массивом' })
  @ArrayNotEmpty({ message: 'Массив шагов не может быть пустым' })
  steps: RouteStep[];
}

export class RouteStep {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  address: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  timeout: number;
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @Exclude()
  routeId?: string;
}

export class GetRouteStep {
  id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  address: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  timeout: number;
  @IsDateString()
  createdAt?: Date;
  @Exclude()
  routeId?: string;
}
