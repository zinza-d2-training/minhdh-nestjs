import { VaccineRegistration } from './../typeorm/entities/VaccineRegistration';
import { Module } from '@nestjs/common';
import { VaccineRegistrationController } from './vaccine-registration.controller';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([VaccineRegistration])],
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService, RolesGuard]
})
export class VaccineRegistrationModule {}
