import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministrativeUnitController } from './administrative-unit.controller';
import { AdministrativeUnitService } from './administrative-unit.service';
import { District } from 'src/typeorm/entities/District';
import { Ward } from 'src/typeorm/entities/Ward';
import { Province } from 'src/typeorm/entities/Province';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Ward])],
  controllers: [AdministrativeUnitController],
  providers: [AdministrativeUnitService]
})
export class AdministrativeUnitModule {}
