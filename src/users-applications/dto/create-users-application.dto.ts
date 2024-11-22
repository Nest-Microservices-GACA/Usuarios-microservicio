import { IsString, IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateUsersApplicationDto {
  @IsString()
  numero_empleado: string;

  @IsString()
  nom_correo: string;

  @IsString()
  nom_contrasena: string;

  @IsString()
  nom_usuario: string;

  @IsBoolean()
  @IsOptional()
  esactivo?: boolean; 

  @IsInt()
  idu_rol: number;
}
