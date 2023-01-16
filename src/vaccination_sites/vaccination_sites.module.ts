import { Module } from '@nestjs/common';
import { VaccinationSitesController } from './vaccination_sites.controller';
import { VaccinationSitesService } from './vaccination_sites.service';
import { VaccinationSites } from 'src/typeorm/entities/VaccinationSites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/District';
import { Ward } from 'src/typeorm/entities/Ward';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([VaccinationSites, District, Ward])],
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService, RolesGuard]
})
export class VaccinationSitesModule {}
