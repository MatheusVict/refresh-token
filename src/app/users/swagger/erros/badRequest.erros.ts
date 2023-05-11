import { ApiProperty } from '@nestjs/swagger';

export class badRequestSwegger {
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty()
  message: string[];
  @ApiProperty()
  error: string;
}
