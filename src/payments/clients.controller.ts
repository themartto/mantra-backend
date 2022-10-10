import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Client } from '../database/entities/client';

@Controller('clients')
export class ClientsController {
  constructor(readonly paymentsService: PaymentsService) {
  }

  @Get(':id')
  async getPayment(@Param() params) {
    return this.paymentsService.getClient(params.id)
  }

  @Get()
  async getAllClients() {
    return await this.paymentsService.getAllClients()
  }

  @Get(':id/all')
  async getAllClientPayments(@Param() params) {
    return await this.paymentsService.getAllClientPayments(params.id);
  }
}