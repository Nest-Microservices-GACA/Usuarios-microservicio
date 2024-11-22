import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsersApplication } from './users-application.entity'; 

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  idu_rol: number;

  @Column({ type: 'varchar', length: 255 })
  nom_rol: string;

 // @OneToMany(() => UsersApplication, (userApp) => userApp.role)
  users: UsersApplication[];
}
