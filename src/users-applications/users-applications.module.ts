import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersApplicationsController } from './users-applications.controller';
import { UsersApplicationsService } from './users-applications.service';
import { PositionsService } from './positions.service';
import { UsersApplication } from './entities/users-application.entity';
import { Position } from './entities/position.entity';
import { CommonService } from './common/common.service'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersApplication, Position]),
    ConfigModule, 
  ],
  controllers: [UsersApplicationsController],
  providers: [UsersApplicationsService, PositionsService, CommonService],
})
export class UsersApplicationsModule {}
