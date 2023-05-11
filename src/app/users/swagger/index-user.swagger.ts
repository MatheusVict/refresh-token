import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersEntity } from '../users.entity';

export class IndexUserSwegger extends PartialType(
  OmitType(UsersEntity, ['password', 'createdAt', 'deletedAt', 'updatedAT']),
) {}
