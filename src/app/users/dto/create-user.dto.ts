import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/message.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessageHelper.Password_Valid,
  })
  @ApiProperty()
  password: string;
}
