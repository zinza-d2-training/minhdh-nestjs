import { VaccineRegistration } from './../typeorm/entities/VaccineRegistration';
import { Module } from '@nestjs/common';
import { VaccineRegistrationController } from './vaccine-registration.controller';
import { VaccineRegistrationService } from './vaccine-registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([VaccineRegistration]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY
    })
  ],
  controllers: [VaccineRegistrationController],
  providers: [VaccineRegistrationService, RolesGuard]
})
export class VaccineRegistrationModule {}
