import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
}
