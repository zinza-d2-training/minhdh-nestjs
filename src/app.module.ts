import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from '@squareboat/nest-console';
import { AdministrativeUnitModule } from './administrative-unit/administrative-unit.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    ConsoleModule,
    AdministrativeUnitModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
