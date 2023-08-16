import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({
    message: 'Имя не может быть пустым',
  })
  name: string;
  @IsNotEmpty({
    message: 'Почта не может быть пустой',
  })
  email: string;
  @MinLength(4, {
    message: 'Пароль должен быть длиннее 6 символов',
  })
  @MaxLength(12, {
    message: 'Пароль не должен быть длиннее 12 символов',
  })
  @IsNotEmpty({
    message: 'Пароль не может быть пустым',
  })
  pass: string;
  refresh_token: string;
}
