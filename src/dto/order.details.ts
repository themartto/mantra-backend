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



// const payload: CreateCardPayload = {
//   idempotencyKey: uuidv4(),
//   expMonth: parseInt(this.formData.cardData.expiry.month),
//   expYear: parseInt(this.formData.cardData.expiry.year),
//   keyId: '',
//   encryptedData: '',
//   billingDetails: {
//     line1: this.formData.cardData.line1,
//     line2: this.formData.cardData.line2,
//     city: this.formData.cardData.city,
//     district: this.formData.cardData.district,
//     postalCode: this.formData.cardData.postalCode,
//     country: this.formData.cardData.country,
//     name: this.formData.cardData.name,
//   },
//   metadata: {
//     phoneNumber: this.formData.cardData.phoneNumber,
//     email: this.formData.cardData.email,
//     sessionId: 'xxx',
//     ipAddress: '172.33.222.1',
//   },
// }
