import { Body, Controller, Post } from '@nestjs/common';
import { OrderDetails } from '../dto/order.details';
import { SaveCard } from '../dto/save.card';
import { CircleApiService } from '../circle-api/circle-api.service';

@Controller('payments')
export class PaymentsController {
    constructor(readonly circleApi: CircleApiService) {}

    @Post('order')
    async order(@Body() orderDetails: OrderDetails) {
        //TODO implement

    }

    @Post('save-card')
    async saveCard(@Body() cardDetails: SaveCard) {
        //TODO implement
    }
}
