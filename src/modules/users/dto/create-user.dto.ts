
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  email: string;
}
