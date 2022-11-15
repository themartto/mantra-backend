import { Injectable } from '@nestjs/common';
import { ethers, utils } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers/src.ts/json-rpc-provider';
import { hexZeroPad } from 'ethers/lib/utils';
import { MantrachainService } from '../mantrachain/mantrachain.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from '../database/entities/transfer';


@Injectable()
export class EthersService {
  provider: JsonRpcProvider;

  constructor(
    readonly mantrachainService: MantrachainService,
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
  ) {
  }

  async onModuleInit() {
    // this.provider = new ethers.providers.WebSocketProvider(process.env.CHAIN_WS);
    //
    // const filter = {
    //   address: process.env.USDC_CONTRACT,
    //   topics: [
    //     // event
    //     utils.id('Transfer(address,address,uint256)'),
    //     null, // from
    //     hexZeroPad(process.env.CHAIN_ADDRESS, 32), //to
    //     // amount
    //   ],
    // };
    // this.provider.on(filter, async (data) => {
    //   let entry = await this.transferRepository.findOne({
    //     where: {
    //       txHash: data.transactionHash,
    //     },
    //     relations: {
    //       keplrAddress: true,
    //     },
    //   });
    //
    //   if (entry) {
    //     entry.status = 'confirmed';
    //
    //     await this.transferRepository.save(entry);
    //
    //     console.log('mint tokens');
    //     await this.mantrachainService.mint(
    //       entry.keplrAddress.keplrAddress,
    //       data.topics[2],
    //       data.transactionHash,
    //     );
    //   } else {
    //     console.log('no entry in the db for this transaction')
    //   }
    // });
  }
}
