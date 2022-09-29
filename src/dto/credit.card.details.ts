export class CreditCardDetails {
  cardNumber: string
  cvv: string
  expiry: {
    month: string
    year: string
  }
}