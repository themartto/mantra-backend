import { All, Controller, Req } from '@nestjs/common';
import { CircleApiService } from '../circle-api/circle-api.service';
import { PaymentsService } from './payments.service';
import rawbody from 'raw-body';
import { Chain } from '@circle-fin/circle-sdk';
import { Transfer } from '../database/entities/transfer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MantrachainService } from '../mantrachain/mantrachain.service';

@Controller('statuses/payment/update')
export class PaymentsStatusController {
  constructor(
    readonly paymentService: PaymentsService,
    readonly circleApi: CircleApiService,
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    readonly mantrachainService: MantrachainService
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
      if  (notification.Type == 'SubscriptionConfirmation') {
        console.log(notification.SubscribeURL);
      } else if (notification.Type == 'Notification') {
        try {
          const notificationData = JSON.parse(notification.Message);
          if (notificationData.notificationType) {
            if (notificationData.notificationType == 'settlements') {
              await this.handleSettlementsNotification(notificationData);
            } else if (notificationData.notificationType == 'transfers') {
              await this.handleTransferNotification(notificationData);
            } else if (notificationData.notificationType == 'payments') {
              // TODO update payment status
              console.log(notificationData)
            }
          } else {
            console.log('no notificationType')
            console.log(notification);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('no notification type')
        console.log(notification)
      }
    }
  }

  async handleSettlementsNotification(message: any) {
    const payment = await this.circleApi.circleApi.payments.listPayments('', message.settlement.id);

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
  }

  async handleTransferNotification(message: any) {
    const transfer = await this.transferRepository.findOne({
      where: {
        transferId: message.transfer.id
      },
      relations: {
        keplrAddress: true
      }
    });

    transfer.txHash = message.transfer.transactionHash;

    transfer.status = message.transfer.status;

    if (message.transfer.status == 'complete') {
      await this.mantrachainService.mint(
          transfer.keplrAddress.keplrAddress,
          message.transfer.amount.amount,
          transfer.txHash
      )
    } else if (message.transfer.status == 'failed') {
      // TODO handle, we need to keep records for those as the client send money for this transfer
    }

    await this.transferRepository.save(transfer);
  }
}
