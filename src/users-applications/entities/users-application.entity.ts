import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Position } from './position.entity'; // Asegúrate de importar la entidad Position

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

  // Relación con Position
  @ManyToOne(() => Position, { eager: true }) // eager para cargar el rol automáticamente
  @JoinColumn({ name: 'idu_rol' }) // Especifica el nombre de la columna de clave foránea
  role: Position;
}
