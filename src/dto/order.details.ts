export class OrderDetails {
  idempotencyKey: string
  plaidProcessorToken: string
  billingDetails: {
    name: string
    city?: string
    country?: string
    line1?: string
    line2?: string
    district?: string
    postalCode?: string
  }
  metadata: OrderMetadata
}

export class OrderMetadata {
  email?: string
  phoneNumber?: string
  sessionId: string
  ipAddress: string
}