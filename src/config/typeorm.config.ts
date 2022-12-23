import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10) || 3306,
      username: process.env.USER,
      database: process.env.DB,
      password: process.env.PASSWORD,
      entities: [__dirname + '/../typeorm/entities/*{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci'
      },
      synchronize: true,
      logging: process.env.NODE_ENV === 'development'
    };
  }
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10) || 3306,
  username: process.env.USER,
  database: process.env.DB,
  password: process.env.PASSWORD,
  entities: [__dirname + '/../typeorm/entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci'
  },
  synchronize: true,
  logging: process.env.NODE_ENV === 'development'
};
