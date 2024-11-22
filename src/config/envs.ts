import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  PORT: number;
  USUARIOS_MICROSERVICE_HOST: string;
  USUARIOS_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
  DB_HOST: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.number().required(),
  PORT: joi.number().required(),
  USUARIOS_MICROSERVICE_HOST: joi.string().required(),
  USUARIOS_MICROSERVICE_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  db: {
    host: envVars.DB_HOST,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_NAME,
    port: envVars.DB_PORT,
  },
  port: envVars.PORT,
  usuariosMicroserviceHost: envVars.USUARIOS_MICROSERVICE_HOST,
  usuariosMicroservicePort: envVars.USUARIOS_MICROSERVICE_PORT,
};
