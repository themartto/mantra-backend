import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment';
import { Transfer } from './transfer';

@Entity()
export class Client {
  @PrimaryColumn()
  keplrAddress: string;

  @OneToMany(
    () => Payment,
    (payment) => payment.keplrAddress
  )
  payments: Payment[];

  @OneToMany(
    () => Transfer,
    (transfer) => transfer.keplrAddress
  )
  transfers: Transfer[];
}