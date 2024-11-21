import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  nom_rol: string;
}
