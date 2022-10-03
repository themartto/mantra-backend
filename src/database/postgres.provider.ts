import {TypeOrmModule} from "@nestjs/typeorm";

export const postgresProvider = TypeOrmModule.forRoot({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: true,
})