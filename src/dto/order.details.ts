import { BillingDetails } from '@circle-fin/circle-sdk';
import { MetadataCardAndAch } from '@circle-fin/circle-sdk/src/generated/models/metadata-card-and-ach';

export class OrderDetails {
  amount: string
  keplrAddress: string
  cardNumber: string
  cardCvv: string
  expMonth: string
  expYear: string
  billingDetails: BillingDetails
  metadata: MetadataCardAndAch
  description: string
}