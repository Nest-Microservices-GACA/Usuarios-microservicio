import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsersApplicationDto } from './dto/create-users-application.dto';
import { UpdateUsersApplicationDto } from './dto/update-users-application.dto';
import { UsersApplication } from './entities/users-application.entity';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';
import { CommonService } from './common/common.service'; 

@Injectable()
export class UsersApplicationsService {
  constructor(
    @InjectRepository(UsersApplication)
    private readonly usersApplicationRepository: Repository<UsersApplication>,
    private readonly commonService: CommonService, 
  ) {}

  async create(createDto: CreateUsersApplicationDto) {
    console.log('Creando nuevo usuario:', createDto);

    const existingUser = await this.usersApplicationRepository.findOne({
      where: {
        numero_empleado: createDto.numero_empleado,
        nom_correo: this.commonService.encrypt(createDto.nom_correo), 
      },
    });

    if (existingUser) {
      throw new ConflictException('El usuario ya existe con este número de empleado o correo');
    }


    createDto.nom_correo = this.commonService.encrypt(createDto.nom_correo);

    const newUser = this.usersApplicationRepository.create(createDto);
    return await this.usersApplicationRepository.save(newUser);
  }

  findAll() {
    console.log('Obteniendo todos los usuarios');
    return this.usersApplicationRepository.find();
  }

  async findOne(id: string) {
    console.log(`Buscando usuario con ID ${id}`);
    const user = await this.usersApplicationRepository.findOne({
      where: { idu_usuario: id },
    });

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Usuario con ID ${id} no encontrado`,
      });
    }


    user.nom_correo = this.commonService.decrypt(user.nom_correo);

    return user;
  }

  async update(id: string, updateDto: UpdateUsersApplicationDto) {
    console.log(`Actualizando usuario con ID ${id}:`, updateDto);
    const user = await this.findOne(id);

    if (updateDto.nom_correo) {
      updateDto.nom_correo = this.commonService.encrypt(updateDto.nom_correo); 
    }

    Object.assign(user, updateDto);
    return await this.usersApplicationRepository.save(user);
  }

  async remove(id: string) {
    console.log(`Eliminando usuario con ID ${id}`);
    const user = await this.findOne(id);
    return await this.usersApplicationRepository.remove(user);
  }

  async findOneWithRole(id: string) {
    console.log(`Buscando usuario con ID ${id} y su rol asociado`);
    const userWithRole = await this.usersApplicationRepository.findOne({
      where: { idu_usuario: id },
      relations: ['role'], 
    });

    if (!userWithRole) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Usuario con ID ${id} no encontrado`,
      });
    }

    return userWithRole;
  }
}
