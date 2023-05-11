import { OmitType } from '@nestjs/swagger';
import { UsersEntity } from 'src/app/users/users.entity';

export class BodyLogin extends OmitType(UsersEntity, [
  'createdAt',
  'deletedAt',
  'firstName',
  'id',
  'lastName',
  'updatedAT',
]) {}
