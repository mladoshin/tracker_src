import { Exclude } from 'class-transformer';
import { GetRoute, Route } from './create-package.dto';

export class GetPackageDto {
  tracking_number: string;
  name: string;
  weight: number;
  mode: string;
  payment_mode: string;
  carrier: string;
  destination: string;
  status: string;
  expected_delivery_date: Date;
  comment: string;
  shipment: string;
  receiver_name: string;
  receiver_phone: string;
  receiver_email: string;
  receiver_address: string;
  start_address: string;
  start_date: Date;
  route: GetRoute;
  createdAt: Date | string;
  tracking_id: string;
}

export class GetPublicPackageDto {
  tracking_id: string;
  @Exclude()
  tracking_number: string;
  name: string;
  weight: number;
  mode: string;
  payment_mode: string;
  carrier: string;
  destination: string;
  status: string;
  expected_delivery_date: Date;
  comment: string;
  shipment: string;
  receiver_name: string;
  @Exclude()
  receiver_phone: string;
  @Exclude()
  receiver_email: string;
  //@Exclude()
  receiver_address: string;
  start_address: string;
  start_date: Date;
  route: GetRoute;
  createdAt: Date | string;

  constructor(partial: Partial<GetPublicPackageDto>) {
    Object.assign(this, partial);
  }
}
