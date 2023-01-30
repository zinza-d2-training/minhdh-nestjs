import { SearchSitesAdminDto } from './dto/search-sites-admin.dto';
import { UpdateSitesDto } from './dto/update-sites-dto';
import { SearchVaccinationSitesDto } from './dto/search-vaccination-sites.dto';
import { Role } from '../auth/role.enum';
import { VaccinationSitesDto } from './dto/vaccination-sites-dto';
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
import { VaccinationSitesService } from './vaccination-sites.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('vaccination-sites')
export class VaccinationSitesController {
  constructor(private vaccinationSitesService: VaccinationSitesService) {}

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
  async findAll(
    @Query('name') name: string | null | undefined,
    @Query('address') address: string | null | undefined
  ) {
    const queryData: SearchSitesAdminDto = {
      name,
      address
    };
    return await this.vaccinationSitesService.findAll(queryData);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() newSite: VaccinationSitesDto) {
    return await this.vaccinationSitesService.createVaccinationSite(newSite);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post(':id')
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
