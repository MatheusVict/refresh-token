import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IndexUserSwegger } from './swagger/index-user.swagger';
import { CreateUserSwegger } from './swagger/create-user.swegge';
import { updateUserSweeger } from './swagger/update-user.swegger';
import { badRequestSwegger } from './swagger/erros/badRequest.erros';
import { unauthorizedSwegger } from './swagger/erros/unauthorized.erros';

@ApiBearerAuth()
@Controller('users')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Return all user from database' })
  @ApiResponse({
    status: 200,
    description: 'user list',
    type: IndexUserSwegger,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: unauthorizedSwegger,
    isArray: true,
  })
  async index() {
    return await this.userService.findAllUser();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Return one user with ID from database' })
  @ApiResponse({
    status: 200,
    description: 'user data',
    type: IndexUserSwegger,
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: unauthorizedSwegger,
    isArray: true,
  })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneUser({ where: { id } });
  }

  @Post()
  @ApiOperation({ summary: "Create a user(you don't need token)" })
  @ApiResponse({
    status: 201,
    description: 'user created',
    type: CreateUserSwegger,
  })
  @ApiResponse({
    status: 400,
    description: 'troubles on creation',
    type: badRequestSwegger,
  })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: unauthorizedSwegger,
    isArray: true,
  })
  async store(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a user with ID' })
  @ApiResponse({
    status: 200,
    description: 'user updated',
    type: updateUserSweeger,
  })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: unauthorizedSwegger,
    isArray: true,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user with ID' })
  @ApiResponse({ status: 204, description: 'user deleted' })
  @ApiResponse({ status: 404, description: 'user not found' })
  @ApiUnauthorizedResponse({
    type: unauthorizedSwegger,
    description: 'unauthorized',
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deletUser(id);
  }
}
