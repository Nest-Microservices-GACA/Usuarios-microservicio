import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersApplicationsService } from './users-applications.service';
import { UsersApplicationsController } from './users-applications.controller';
import { UsersApplication } from './entities/users-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersApplication])],
  controllers: [UsersApplicationsController],
  providers: [UsersApplicationsService],
})
export class UsersApplicationsModule {}
