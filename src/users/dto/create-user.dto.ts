import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Must not be empty' })
  @Length(3, 200, { message: 'Must be min 3 and max 200 chars' })
  name: string;

  @IsNotEmpty({ message: 'Must not be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Must not be empty' })
  @IsStrongPassword()
  password: string;
}
