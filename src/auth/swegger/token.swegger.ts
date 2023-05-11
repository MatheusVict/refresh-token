import { ApiProperty } from '@nestjs/swagger';

export class TokenSwegger {
  @ApiProperty()
  token: string;
}
