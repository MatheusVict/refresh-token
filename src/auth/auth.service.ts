import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/app/users/users.entity';
import { UsersService } from 'src/app/users/users.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

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
