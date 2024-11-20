import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios_applications')
export class UsersApplication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int' })
  idu_aplicacion: number;

  @Column({ type: 'int' })
  idu_usuario: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
