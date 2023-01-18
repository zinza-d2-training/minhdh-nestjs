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
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('vaccine-registration')
export class VaccineRegistrationController {
  constructor(private vaccineRegistrationService: VaccineRegistrationService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.vaccineRegistrationService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.vaccineRegistrationService.findById(id);
  }

  @Get('user/:id')
  async findByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.vaccineRegistrationService.findByUserId(id);
  }

  @Post()
  async create(@Body() newData: CreateVaccineRegistrationDto) {
    return await this.vaccineRegistrationService.create(newData);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateVaccineRegistrationDto
  ) {
    return await this.vaccineRegistrationService.update(id, updateData);
  }
}
