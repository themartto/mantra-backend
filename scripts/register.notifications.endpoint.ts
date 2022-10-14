import * as dotenv from 'dotenv';
dotenv.config()
import { Circle, CircleEnvironments } from '@circle-fin/circle-sdk';
import { SubscriptionRequest } from '@circle-fin/circle-sdk/src/generated/models/subscription-request';

const run = async () => {
  const circleApi = new Circle(
    process.env.API_KEY,
    Boolean(process.env.DEV) ? CircleEnvironments.sandbox : CircleEnvironments.production,    // API base url
  );

  const data: SubscriptionRequest = {
    endpoint: 'https://0e15f565b1adb6.lhr.life/statuses/payment/update'
  }

  const resp = await circleApi.subscriptions.createSubscribtion(data);
  //
  // const resp2 = await circleApi.subscriptions.listSubscriptions();

  // const resp2 = await circleApi.subscriptions.deleteSubscribtion('b7c9e731-058e-4da1-b44a-e59ff621606f');
  // const resp3 = await circleApi.subscriptions.deleteSubscribtion('b553286c-3c22-4eb0-84dd-73def38ebf51');
  // const resp4 = await circleApi.subscriptions.deleteSubscribtion('c2f869dc-a6c0-4db7-bba5-5628bb1ed799');


  // console.log(resp2.data.data[0].subscriptionDetails)
  // console.log(resp2.data.data[1].subscriptionDetails)
  // console.log(resp2.data.data[2].subscriptionDetails)
  console.log(resp.data)
};

run();