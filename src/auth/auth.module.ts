import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      privateKey: process.env.JWT_EXPIRES_TIME,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_TIME}s` },
    }),
    PassportModule,
    UsersModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
