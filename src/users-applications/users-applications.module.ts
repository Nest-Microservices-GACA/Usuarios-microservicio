import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersApplicationsService } from './users-applications.service';
import { UsersApplicationsController } from './users-applications.controller';
import { UsersApplication } from './entities/users-application.entity';
import { PositionsService } from './positions.service';
import { Position } from './entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersApplication, Position])],
  controllers: [UsersApplicationsController],
  providers: [UsersApplicationsService, PositionsService],
})
export class UsersApplicationsModule {}
