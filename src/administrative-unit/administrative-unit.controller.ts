import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AdministrativeUnitService } from './administrative-unit.service';
@Controller('administrative-unit')
export class AdministrativeUnitController {
  constructor(private readonly adminService: AdministrativeUnitService) {}

  @Get('provinces')
  async findProvinces() {
    return await this.adminService.getProvinces();
  }

  @Get('districts/:id')
  async findDistricts(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getDistricts(id);
  }

  @Get('wards/:id')
  async findWard(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getWards(id);
  }
}
