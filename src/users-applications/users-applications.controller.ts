import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUsersApplicationDto } from './dto/create-users-application.dto';
import { UpdateUsersApplicationDto } from './dto/update-users-application.dto';
import { UsersApplicationsService } from './users-applications.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionsService } from './positions.service';

@Controller()
export class UsersApplicationsController {
  constructor(
    private readonly usersApplicationsService: UsersApplicationsService,
    private readonly positionsService: PositionsService,
  ) {}

  @MessagePattern('create_users_application')
  create(data: CreateUsersApplicationDto) {
    console.log('Mensaje recibido en create_users_application:', data);
    return this.usersApplicationsService.create(data);
  }

  @MessagePattern('get_all_users_applications')
  findAll() {
    console.log('Mensaje recibido en get_all_users_applications');
    return this.usersApplicationsService.findAll();
  }

  @MessagePattern('get_users_application')
  findOne(id: string) { 
    console.log(`Mensaje recibido en get_users_application con ID ${id}`);
    return this.usersApplicationsService.findOne(id);
  }

  @MessagePattern('update_users_application')
  update(data: { id: string; updateDto: UpdateUsersApplicationDto }) { 
    console.log('Mensaje recibido en update_users_application:', data);
    return this.usersApplicationsService.update(data.id, data.updateDto);
  }

  @MessagePattern('delete_users_application')
  remove(id: string) { 
    console.log(`Mensaje recibido en delete_users_application con ID ${id}`);
    return this.usersApplicationsService.remove(id);
  }

  @MessagePattern('create_role')
  createRole(data: CreatePositionDto) {
    console.log('Mensaje recibido en create_role:', data);
    return this.positionsService.create(data);
  }

  @MessagePattern('get_all_roles')
  findAllRoles() {
    console.log('Mensaje recibido en get_all_roles');
    return this.positionsService.findAll();
  }

  @MessagePattern('get_role')
  findOneRole(id: number) {
    console.log(`Mensaje recibido en get_role con ID ${id}`);
    return this.positionsService.findOne(id);
  }

  @MessagePattern('update_role')
  updateRole(data: { id: number; updateDto: UpdatePositionDto }) {
    console.log('Mensaje recibido en update_role:', data);
    return this.positionsService.update(data.id, data.updateDto);
  }

  @MessagePattern('delete_role')
  removeRole(id: number) {
    console.log(`Mensaje recibido en delete_role con ID ${id}`);
    return this.positionsService.remove(id);
  }

  @MessagePattern('get_user_with_role')
  findUserWithRole(id: string) { 
    console.log(`Mensaje recibido en get_user_with_role con ID ${id}`);
    return this.usersApplicationsService.findOneWithRole(id);
  }

  @MessagePattern('get_role_with_users')
  findRoleWithUsers(id: number) {
    console.log(`Mensaje recibido en get_role_with_users con ID ${id}`);
    return this.positionsService.findOneWithUsers(id);
  }
}
