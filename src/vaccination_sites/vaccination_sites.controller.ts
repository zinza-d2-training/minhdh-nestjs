import { UpdateSitesDto } from './dto/update-sites-dto';
import { SearchVaccinationSitesDto } from './dto/search-vaccination-sites.dto';
import { Role } from './../auth/role.enum';
import { VaccinationSitesDto } from './dto/vaccination-sites-dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ParseIntPipe,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { VaccinationSitesService } from './vaccination_sites.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private vaccinationSitesService: VaccinationSitesService) {}

  @UsePipes(new ValidationPipe())
  @Get('condition')
  async findAllWithCondition(
    @Query('province_id') province_id: number | null | undefined,
    @Query('district_id') district_id: number | null | undefined,
    @Query('ward_id') ward_id: number | null | undefined
  ) {
    const queryData: SearchVaccinationSitesDto = {
      province_id,
      district_id,
      ward_id
    };
    return await this.vaccinationSitesService.findAllWithCondition(queryData);
  }

  @Get()
  async findAll() {
    return await this.vaccinationSitesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() newSite: VaccinationSitesDto) {
    return await this.vaccinationSitesService.createVaccinationSite(newSite);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedSite: UpdateSitesDto
  ) {
    return await this.vaccinationSitesService.updateVaccinationSiteById(
      id,
      updatedSite
    );
  }
}
