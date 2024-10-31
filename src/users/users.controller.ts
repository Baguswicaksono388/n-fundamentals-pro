import { Controller, Post, Body, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuccessCreateUserDto } from './dto/success-create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessCreateUserDto> {
    const user = await this.usersService.signUp(createUserDto);
    return user;
  }
}
