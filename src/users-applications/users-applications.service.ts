import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersApplicationDto } from './dto/create-users-application.dto';
import { UpdateUsersApplicationDto } from './dto/update-users-application.dto';
import { UsersApplication } from './entities/users-application.entity';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';


@Injectable()
export class UsersApplicationsService {
  constructor(
    @InjectRepository(UsersApplication)
    private readonly usersApplicationRepository: Repository<UsersApplication>,
  ) {}

  async create(createDto: CreateUsersApplicationDto) {
    const existingAssignment = await this.usersApplicationRepository.findOne({
      where: {
        idu_aplicacion: createDto.idu_aplicacion,
        idu_usuario: createDto.idu_usuario,
      },
    });

    if (existingAssignment) {
      throw new ConflictException('La aplicación ya está asignada a este usuario');
    }

    const newAssignment = this.usersApplicationRepository.create(createDto);
    return await this.usersApplicationRepository.save(newAssignment);
  }

  findAll() {
    return this.usersApplicationRepository.find();
  }

  async findOne(id: number) {
    const assignment = await this.usersApplicationRepository.findOne({
      where: { id },
    });
    if (!assignment) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Asignación con id ${id} no encontrada`,
      });
    }
    return assignment;
  }
  async update(id: number, updateDto: UpdateUsersApplicationDto) {
    const assignment = await this.findOne(id);
    Object.assign(assignment, updateDto);
    return await this.usersApplicationRepository.save(assignment);
  }

  async remove(id: number) {
    const assignment = await this.findOne(id);
    return await this.usersApplicationRepository.remove(assignment);
  }
}
