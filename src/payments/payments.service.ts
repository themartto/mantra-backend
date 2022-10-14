import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../database/entities/payment';
import { Client } from '../database/entities/client';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async addClient(user: Client) {
    return await this.clientRepository.save(user);
  }

  async getClient(keplrAddress: string) {
    return await this.clientRepository.find(
      {
        where: {
          keplrAddress
        }
      }
    )
  }

  async getAllClients() {
    return await this.clientRepository.find({
      relations: {
        payments: true
      }
    });
  }

  async addPayment(payment: Payment) {
    return await this.paymentRepository.save(payment);
  }

  async getPayment(paymentId: string) {
    return await this.paymentRepository.findOneBy({ paymentId })
  }

  async getAllClientPayments(keplrAddress: string) {
    return await this.clientRepository.find({
      where: {
        keplrAddress
      },
      relations: {
        payments: true
      }
    })
  }

  async updatePaymentStatus(paymentId: string, status: string) {
    const payment = await this.getPayment(paymentId);
    payment.status = status;
    await this.paymentRepository.save(payment);
  }

  // async makeTransfer() {
  //
  // }
}
