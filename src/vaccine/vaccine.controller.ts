import { VaccineDto } from './dto/vaccine-dto';
import { VaccineService } from './vaccine.service';
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

@Controller('vaccine')
export class VaccineController {
  constructor(private vaccineService: VaccineService) {}

  @Get()
  async findAll() {
    return await this.vaccineService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.vaccineService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() newData: VaccineDto) {
    return await this.vaccineService.create(newData);
  }
}
