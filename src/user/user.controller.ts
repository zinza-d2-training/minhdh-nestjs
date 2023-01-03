import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers() {
    const allUsers = await this.userService.findAll();
    return allUsers;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @Post(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: CreateUserDto
  ) {
    const userUpdate = await this.userService.updateUserById(id, user);
    return userUpdate;
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
