import { Injectable } from '@nestjs/common';
import { Circle, CircleEnvironments } from '@circle-fin/circle-sdk';

@Injectable()
export class CircleApiService {

  circleApi: Circle;

  constructor() {
    this.circleApi = new Circle(
        process.env.API_KEY,
        Boolean(process.env.API_KEY) ? CircleEnvironments.sandbox : CircleEnvironments.production    // API base url
    );
  }
}
