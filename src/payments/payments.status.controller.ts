import { All, Controller, Req } from '@nestjs/common';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsService } from './payments.service';
import rawbody from 'raw-body';
import { Chain } from '@circle-fin/circle-sdk';
import { Client } from '../database/entities/client';
import { Transfer } from '../database/entities/transfer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('statuses/payment/update')
export class PaymentsStatusController {
  constructor(
    readonly paymentService: PaymentsService,
    readonly circleApi: CircleApiService,
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {
  }

  @All()
  async updatePaymentStatus(@Req() req: any) {
    // TODO refactor this
    if (req.readable) {
      // body is ignored by NestJS -> get raw body from request
      const raw = await rawbody(req);
      const text = raw.toString().trim();
      const notification = JSON.parse(text);
      console.log('notification')
      console.log(notification)
      try {
        const notificationData = JSON.parse(notification.Message);
        // console.log(notificationData)
        if (notificationData.notificationType) {
          if (notificationData.notificationType == 'settlements') {
            // payment went well?
            // console.log(notificationData);
            const payment = await this.circleApi.circleApi.payments.listPayments('', notificationData.settlement.id);
            // console.log(payment.data.data[0]);
            const paymentData: any = payment.data.data[0];

            const paymentEntry = await this.paymentService.getPayment(paymentData.id);

            await this.paymentService.updatePaymentStatus(paymentEntry.paymentId, 'success');

            // TODO amount could be stored in our database
            await this.circleApi.makeTransfer(
              paymentData.amount.amount,
              process.env.CHAIN_ADDRESS,
              Chain.Eth,
              paymentEntry.keplrAddress.keplrAddress,
            );
          } else if (notificationData.notificationType == 'transfer') {
            console.log('notificationData')
            console.log(notificationData)
            const transfer = await this.transferRepository.findOne({
              where: {
                txHash: notificationData.transactionHash
              },
              relations: {
                keplrAddress: true
              }
            });
            console.log('transfer')
            console.log(transfer)
            transfer.status = notificationData.status;

            await this.transferRepository.save(transfer);
          }
        } else {
          // TODO handle
          console.log('notification')
          console.log(notification);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
