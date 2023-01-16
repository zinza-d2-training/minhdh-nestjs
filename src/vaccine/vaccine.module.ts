import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccineController } from './vaccine.controller';
import { VaccineService } from './vaccine.service';
import { Vaccine } from 'src/typeorm/entities/Vaccine';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine])],
  controllers: [VaccineController],
  providers: [VaccineService]
})
export class VaccineModule {}
