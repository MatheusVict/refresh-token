import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
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
}
