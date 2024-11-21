import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto);
    return await this.positionRepository.save(position);
  }

  findAll() {
    return this.positionRepository.find();
  }

  async findOne(id: number) {
    const position = await this.positionRepository.findOne({ where: { idu_rol: id } });
    if (!position) {
      throw new NotFoundException(`Rol con id ${id} no encontrado`);
    }
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

    return await this.positionRepository.save(position);
  }

  async remove(id: number) {
    const position = await this.findOne(id);
    return await this.positionRepository.remove(position);
  }
}
