import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './client';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  transferId: string

  @Column()
  txHash: string

  @Column()
  status: string;

  @ManyToOne(
    () => Client,
    (client) => client.payments
  )
  keplrAddress: Client;
}