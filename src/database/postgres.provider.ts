import {TypeOrmModule} from "@nestjs/typeorm";
import { Client } from './entities/client';
import { Payment } from './entities/payment';

export const postgresProvider = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Client, Payment],
  synchronize: true,
})