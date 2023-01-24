import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async saveToken(hash: string, emailuser: string) {
    const obejctToken = await this.tokenRepository.findOne({
      where: { emailuser },
    });

    if (obejctToken) {
      await this.tokenRepository.update(obejctToken.id, {
        hash,
      });
    } else {
      await this.tokenRepository.insert({
        hash,
        emailuser,
      });
    }
  }

  async refreshToken(oldToken: string) {
    const obejctToken = await this.tokenRepository.findOne({
      where: { hash: oldToken },
    });

    if (!obejctToken) throw new UnauthorizedException('Token inválido');

    const user = await this.usersService.findOneUser({
      where: { email: obejctToken.emailuser },
    });
    return this.authService.login(user);
  }
}
