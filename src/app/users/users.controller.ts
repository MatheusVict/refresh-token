import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async index() {}

  @Post()
  async store() {}

  @Get(':id')
  async show() {}

  @Put(':id')
  async update() {}

  @Delete(':id')
  async destroy() {}
}
