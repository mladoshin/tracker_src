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
} from 'class-validator';
export class CreatePackageDto {
  name: string;
  @IsNotEmpty({ message: 'Вес не может быть пустым' })
  @IsNumber({ allowInfinity: false }, { message: 'Вес должен быть числом' })
  weight: number;
  mode: string;
  payment_mode: string;
  carrier: string;
  @IsNotEmpty({ message: 'Адрес не может быть пустым' })
  destination: string;
  status: string;
  @IsDateString({}, { message: 'Некорректная дата доставки' })
  expected_delivery_date: Date;
  comment: string;
  shipment: string;
  @IsNotEmpty({ message: 'Имя адресата не может быть пустым' })
  receiver_name: string;
  @IsNotEmpty({ message: 'Телефон адресата не может быть пустым' })
  receiver_phone: string;
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Почта адресата не может быть пустой' })
  receiver_email: string;
  @IsNotEmpty({ message: 'Адрес адресата не может быть пустым' })
  receiver_address: string;
  @IsNotEmpty({ message: 'Начальный адрес не может быть пустым' })
  start_address: string;
  @IsNotEmpty({ message: 'Начальная дата не может быть пустой' })
  start_date: Date;
  route: Route;
}

export class Route {
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
  @IsDateString()
  createdAt?: Date;
}
