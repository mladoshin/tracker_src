import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class LoginuserDto extends OmitType(CreateUserDto, ['name']) {}
