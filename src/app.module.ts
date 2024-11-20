import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersApplicationsModule } from './users-applications/users-applications.module';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.db.host,
      port: envs.db.port,
      username: envs.db.username,
      password: envs.db.password,
      database: envs.db.database,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersApplicationsModule,
  ],
})
export class AppModule {}
