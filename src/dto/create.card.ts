export class CreateCard {
    idempotencyKey: string
    keyId: string
    encryptedData: string
    billingDetails: {
        name: string
        city: string
        country: string
        line1: string
        line2: string
        district: string
        postalCode: string
    }
    expMonth: string
    expYear: string
    metadata: Metadata
}

export class Metadata {
    email: string
    phoneNumber: string
    sessionId: string
    ipAddress: string
}
