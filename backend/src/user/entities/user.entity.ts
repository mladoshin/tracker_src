import { IsEmail, IsNotEmpty } from 'class-validator';
export class User {
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
