import { User } from './typeorm/entities/User';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from '@squareboat/nest-console';
import { AdministrativeUnitModule } from './administrative-unit/administrative-unit.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10) || 3306,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
    ConsoleModule,
    AdministrativeUnitModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
