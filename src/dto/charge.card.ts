import { MetadataPayment } from '@circle-fin/circle-sdk';

export class ChargeCardDetails {
  amount: string
  cardId: string
  cvvSecret: string
  cvvSecretKeyId: string
  description: string
  metadata: MetadataPayment
}