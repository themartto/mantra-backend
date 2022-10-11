import {TypeOrmModule} from "@nestjs/typeorm";
import { Client } from './entities/client';
import { Payment } from './entities/payment';

export const postgresProvider = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  entities: [Client, Payment],
  synchronize: true,
})