import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BodyLogin } from './swegger/bodyLogin';
import { TokenSwegger } from './swegger/token.swegger';

@Controller('auth')
@ApiTags('refresh')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiBody({
    type: BodyLogin,
  })
  @ApiResponse({
    status: 201,
    type: TokenSwegger,
  })
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }
}
