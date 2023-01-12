import { Group } from './../typeorm/entities/Group';
import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService, RolesGuard]
})
export class GroupModule {}
