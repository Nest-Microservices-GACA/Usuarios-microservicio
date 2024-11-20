import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CreateUsersApplicationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  idu_aplicacion: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  idu_usuario: number;
}
