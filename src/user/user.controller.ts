import { UpdateUser } from './dtos/update-user.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findUserById(id);
  }

  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUser
  ) {
    return await this.userService.updateUserById(id, updateUser);
  }
}
