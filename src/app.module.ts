import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from '@squareboat/nest-console';
import { AdministrativeUnitModule } from './administrative-unit/administrative-unit.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { VaccinationSitesModule } from './vaccination_sites/vaccination_sites.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    ConsoleModule,
    AdministrativeUnitModule,
    AuthModule,
    ForgotPasswordModule,
    VaccinationSitesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
