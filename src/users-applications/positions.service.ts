import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { CommonService } from './common/common.service';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    private readonly commonService: CommonService, 
  ) {}

  async create(createPositionDto: CreatePositionDto) {

    createPositionDto.nom_rol = this.commonService.encrypt(createPositionDto.nom_rol);

    const position = this.positionRepository.create(createPositionDto);
    return await this.positionRepository.save(position);
  }

  async findAll() {
    const positions = await this.positionRepository.find();

    return positions.map((position) => {
      position.nom_rol = this.commonService.decrypt(position.nom_rol);
      return position;
    });
  }

  async findOne(id: number) {
    const position = await this.positionRepository.findOne({ where: { idu_rol: id } });
    if (!position) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    position.nom_rol = this.commonService.decrypt(position.nom_rol);
    return position;
  }

  async findOneWithUsers(id: number) {
    const roleWithUsers = await this.positionRepository.findOne({
      where: { idu_rol: id },
      relations: ['users'],
    });

    if (!roleWithUsers) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    roleWithUsers.nom_rol = this.commonService.decrypt(roleWithUsers.nom_rol);
    return roleWithUsers;
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    const position = await this.positionRepository.preload({
      idu_rol: id,
      ...updatePositionDto,
    });

    if (!position) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }

    if (updatePositionDto.nom_rol) {
      updatePositionDto.nom_rol = this.commonService.encrypt(updatePositionDto.nom_rol);
    }

    Object.assign(position, updatePositionDto);
    return await this.positionRepository.save(position);
  }

  async remove(id: number) {
    const position = await this.findOne(id);
    return await this.positionRepository.remove(position);
  }
}
