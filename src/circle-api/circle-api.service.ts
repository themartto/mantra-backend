import { Injectable } from '@nestjs/common';
import { OrderDetails } from '../dto/order.details';
import { SaveCard } from '../dto/save.card';
import axios from 'axios';

@Injectable()
export class CircleApiService {
  baseUrl = Boolean(process.env.PROD) ?
    'https://api.circle.com':
    'https://api-sandbox.circle.com';

  config = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    }
  }

  async createOrder(orderDetails: OrderDetails) {
    const url = `${this.baseUrl}/v1/payments`;
    const result = await axios.post(
      url,
      orderDetails,
      this.config
    );

    console.log(result)
  }

  async saveCreditCard(cardDetails: SaveCard) {
    const url = `${this.baseUrl}/v1/cards`;

    const result = await axios.post(
      url,
      cardDetails,
      this.config
    );

    console.log(result)
  }

  async getPaymentStatus() {
    const paymentId = 0;

    const url = `${this.baseUrl}/v1/payments/${paymentId}`;

    const result = await axios.get(url, this.config);

    console.log(result);
  }
}
