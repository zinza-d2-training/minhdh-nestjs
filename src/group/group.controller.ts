import { GroupDto } from './dto/group-dto';
import { GroupService } from './group.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async findAll() {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.groupService.findOneById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() newData: GroupDto) {
    return await this.groupService.create(newData);
  }
}
