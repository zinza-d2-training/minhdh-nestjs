import { Module } from '@nestjs/common';
import { VaccinationSitesController } from './vaccination-sites.controller';
import { VaccinationSitesService } from './vaccination-sites.service';
import { VaccinationSites } from 'src/typeorm/entities/VaccinationSites';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from 'src/typeorm/entities/District';
import { Ward } from 'src/typeorm/entities/Ward';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccinationSites, District, Ward]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY
    })
  ],
  controllers: [VaccinationSitesController],
  providers: [VaccinationSitesService, RolesGuard]
})
export class VaccinationSitesModule {}
