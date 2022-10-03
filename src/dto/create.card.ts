import { BillingDetails } from '@circle-fin/circle-sdk';
import { MetadataCardAndAch } from '@circle-fin/circle-sdk/src/generated/models/metadata-card-and-ach';

export class CreateCardDetails {
    number: string
    cvv: string
    expMonth: string
    expYear: string
    billingDetails: BillingDetails
    metadata: MetadataCardAndAch
}