import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsDateString,
  Min,
  IsArray,
  ArrayNotEmpty,
  IsAlphanumeric,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreatePackageDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @IsNotEmpty({ message: 'Вес не может быть пустым' })
  @IsNumber({ allowInfinity: false }, { message: 'Вес должен быть числом' })
  weight: number;

  mode: string;
  payment_mode: string;
  carrier: string;

  @IsString()
  @IsNotEmpty({ message: 'Адрес не может быть пустым' })
  destination: string;

  status: string;


  @IsDateString({}, { message: 'Некорректная дата доставки' })
  expected_delivery_date: Date;
  
  @IsAlphanumeric()
  comment: string;

  @IsAlphanumeric()
  shipment: string;

  @IsString()
  @IsNotEmpty({ message: 'Имя адресата не может быть пустым' })
  receiver_name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  receiver_phone: string;

  @IsOptional()
  @IsEmail()
  receiver_email: string;

  @IsString()
  @IsNotEmpty({ message: 'Адрес адресата не может быть пустым' })
  receiver_address: string;

  @IsString()
  @IsNotEmpty({ message: 'Начальный адрес не может быть пустым' })
  start_address: string;

  @IsString()
  @IsNotEmpty({ message: 'Начальная дата не может быть пустой' })
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
