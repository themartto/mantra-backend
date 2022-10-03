import { MetadataPayment } from '@circle-fin/circle-sdk';

export class ChargeCardDetails {
  amount: string
  cardId: string
  cardCvv: string
  description: string
  metadata: MetadataPayment
}