import { Body, Controller, Put } from '@nestjs/common';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { TokenService } from './token.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenSwegger } from 'src/auth/swegger/token.swegger';

@Controller('token')
@ApiTags('refresh')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Put('refresh')
  @ApiResponse({
    status: 200,
    type: TokenSwegger,
  })
  async refreshToken(@Body() refresh: RefreshTokenDTO) {
    return this.tokenService.refreshToken(refresh.oldToken);
  }
}
