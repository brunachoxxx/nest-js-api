import { IsNotEmpty, Length, IsEmail, IsStrongPassword } from 'class-validator';

export class RegAuthDto {
  @IsNotEmpty()
  @Length(3, 255)
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  password: string;
}
