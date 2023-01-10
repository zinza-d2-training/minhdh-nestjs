import { SearchDto } from './dto/searchVaccinationSites-dto';
import { Role } from './../auth/role.enum';
import { VaccinationSitesDto } from './dto/vaccinationSite-dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ParseIntPipe,
  Param,
  Query
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination_sites.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private vaccinationSitesService: VaccinationSitesService) {}

  @Get()
  async findAll(@Query() queryData: SearchDto) {
    return await this.vaccinationSitesService.findAllWithCondition(queryData);
  }

  @Get(':id')
  async findByWardId(@Param('id', ParseIntPipe) id: number) {
    return await this.vaccinationSitesService.findByWardId(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async create(@Body() newSite: VaccinationSitesDto) {
    return await this.vaccinationSitesService.createVaccinationSite(newSite);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedSite: VaccinationSitesDto
  ) {
    return await this.vaccinationSitesService.updateVaccinationSiteById(
      id,
      updatedSite
    );
  }
}
