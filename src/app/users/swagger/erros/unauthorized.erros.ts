import { ApiProperty } from '@nestjs/swagger';

export class unauthorizedSwegger {
  @ApiProperty({ default: 401 })
  statusCode: number;

  @ApiProperty()
  message: string;
}
