import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration-dto';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration-dto';
import { VaccineRegistrationService } from './vaccine-registration.service';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
  Post,
  Body
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('vaccine-registration')
export class VaccineRegistrationController {
  constructor(private vaccineRegistrationService: VaccineRegistrationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return await this.vaccineRegistrationService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.vaccineRegistrationService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() newData: CreateVaccineRegistrationDto) {
    return await this.vaccineRegistrationService.create(newData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateVaccineRegistrationDto
  ) {
    return await this.vaccineRegistrationService.update(id, updateData);
  }
}
