import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid') // Da pra declarar uuid só de por o nome
  @ApiProperty()
  id: string;

  @Column({ name: 'first_name', type: 'text' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name', type: 'text' })
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({ type: 'text' })
  @ApiProperty()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  @BeforeInsert() //Antes de enserir um novo executa isso aqui
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
