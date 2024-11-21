import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersApplicationsService } from './users-applications.service';
import { CreateUsersApplicationDto } from './dto/create-users-application.dto';
import { UpdateUsersApplicationDto } from './dto/update-users-application.dto';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller()
export class UsersApplicationsController {
  constructor(
    private readonly usersApplicationsService: UsersApplicationsService,
    private readonly positionsService: PositionsService,
  ) {}

  // Users Applications Management
  @MessagePattern({ cmd: 'create_users_application' })
  create(data: CreateUsersApplicationDto) {
    return this.usersApplicationsService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_users_applications' })
  findAll() {
    return this.usersApplicationsService.findAll();
  }

  @MessagePattern({ cmd: 'get_users_application' })
  findOne(id: number) {
    return this.usersApplicationsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_users_application' })
  update(data: { id: number; updateDto: UpdateUsersApplicationDto }) {
    return this.usersApplicationsService.update(data.id, data.updateDto);
  }

  @MessagePattern({ cmd: 'delete_users_application' })
  remove(id: number) {
    return this.usersApplicationsService.remove(id);
  }

  @MessagePattern({ cmd: 'get_user_with_role' }) 
  findOneWithRole(@Payload('id') id: number) {
    return this.usersApplicationsService.findOneWithRole(id);
  }

  @MessagePattern({ cmd: 'create_role' })
  createRole(data: CreatePositionDto) {
    return this.positionsService.create(data);
  }

  @MessagePattern({ cmd: 'get_all_roles' })
  findAllRoles() {
    return this.positionsService.findAll();
  }

  @MessagePattern({ cmd: 'get_role' })
  findOneRole(id: number) {
    return this.positionsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_role' })
  updateRole(data: { id: number; updateDto: UpdatePositionDto }) {
    return this.positionsService.update(data.id, data.updateDto);
  }

  @MessagePattern({ cmd: 'delete_role' })
  removeRole(id: number) {
    return this.positionsService.remove(id);
  }

  @MessagePattern({ cmd: 'get_role_with_users' }) 
  findOneWithUsers(@Payload('id') id: number) {
    return this.positionsService.findOneWithUsers(id);
  }
}
