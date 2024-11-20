import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersApplicationsService } from './users-applications.service';
import { CreateUsersApplicationDto } from './dto/create-users-application.dto';
import { UpdateUsersApplicationDto } from './dto/update-users-application.dto';

@Controller()
export class UsersApplicationsController {
  constructor(private readonly usersApplicationsService: UsersApplicationsService) {}

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
}
