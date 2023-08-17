import { CreateRouteDto } from './create-route.dto';

export class GetRouteDto extends CreateRouteDto {
  from: string;
  to: string;
  id: string;
}
