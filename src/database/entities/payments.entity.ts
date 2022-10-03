import { Column, Entity } from 'typeorm';

@Entity()
export class PaymentsEntity {

  @Column()
  keplrAddress: string

  @Column()
  paymentId: string

  @Column()
  status: string
}