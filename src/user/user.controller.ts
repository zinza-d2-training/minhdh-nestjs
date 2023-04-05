import { UpdateInfoUser } from './dtos/update-info-user-dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserById(id);
  }

  @Post(':id')
  async updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateInfoUser
  ) {
    return await this.userService.updateUserById(id, updateUser);
  }

  @Post(':id/password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() password: string
  ) {
    return await this.userService.updatePasswordUser(id, password);
  }
}
