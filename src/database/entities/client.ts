import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment';

@Entity()
export class Client {
  @PrimaryColumn()
  keplrAddress: string;

  @OneToMany(
    () => Payment,
    (payment) => payment.keplrAddress
  )
  payments: Payment[];
}