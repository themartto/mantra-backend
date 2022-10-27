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
    endpoint: 'https://local-run.testmeaway.com/statuses/payment/update'
  }

  // const resp = await circleApi.subscriptions.createSubscribtion(data);
  //
  const resp = await circleApi.subscriptions.listSubscriptions();

  // const resp3 = await circleApi.subscriptions.deleteSubscribtion(resp.data.data[0].id);
  // const resp4 = await circleApi.subscriptions.deleteSubscribtion(resp.data.data[1].id);
  // const resp5 = await circleApi.subscriptions.deleteSubscribtion(resp.data.data[2].id);

  console.log(resp.data.data[0].subscriptionDetails)
  console.log(resp.data.data[1].subscriptionDetails)
  console.log(resp.data.data[2].subscriptionDetails)
  console.log(resp.data.data)
};

run();
