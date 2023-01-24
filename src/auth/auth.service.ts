import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: Partial<UsersEntity>) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    await this.tokenService.saveToken(token, user.email);

    return {
      token: token,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneUser({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPassValid = compareSync(password, user.password);

    if (!isPassValid) return null;

    return user;
  }
}
