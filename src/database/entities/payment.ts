import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  paymentId: string

  @Column()
  status: string;

  @ManyToOne(
    () => Client,
    (client) => client.payments
  )
  keplrAddress: Client;
}