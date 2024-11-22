import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersApplicationsService } from './users-applications.service';
import { UsersApplicationsController } from './users-applications.controller';
import { UsersApplication } from './entities/users-application.entity';
import { PositionsService } from './positions.service';
import { Position } from './entities/position.entity';
import { USERS_APPLICATIONS_SERVICE } from 'src/config';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersApplication, Position]),
  ],
  controllers: [UsersApplicationsController],
  providers: [UsersApplicationsService, PositionsService],
})
export class UsersApplicationsModule {}
