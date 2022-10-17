import { Injectable, Provider } from '@nestjs/common';
import { Contract, ethers, utils } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers/src.ts/json-rpc-provider';
import { hexZeroPad } from 'ethers/lib/utils';


@Injectable()
export class EthersService {
  provider: JsonRpcProvider

  constructor() {}

  async onModuleInit() {
    this.provider = new ethers.providers.WebSocketProvider(process.env.CHAIN_WS);

    const  filter = {
      address: process.env.USDC_CONTRACT,
      topics: [
        // event
        utils.id("Transfer(address,address,uint256)"),
        null, // from
        hexZeroPad(process.env.CHAIN_ADDRESS, 32) //to
        // amount
      ]
    }
    this.provider.on(filter, (data) => {
      console.log(data);
      // {
      //   blockNumber: 7767041,
      //     blockHash: '0xee48bf3427a429442b91e2b68c7ed76c85bac0423ae85463c40a5e17c0e9a2c4',
      //   transactionIndex: 39,
      //   removed: false,
      //   address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      //   data: '0x0000000000000000000000000000000000000000000000000000000005f5e100',
      //   topics: [
      //   '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      //   '0x00000000000000000000000075c0c372da875a4fc78e8a37f58618a6d18904e8',
      //   '0x00000000000000000000000086af458b3a817d42eece5d8afb10455e3ca202d7'
      // ],
      //   transactionHash: '0x9f910dea6b294b69591d03650ac0014f3cbf40634203d0905935c6dad0f81b62',
      //   logIndex: 76
      // }

      // mantrachainService.mintNewTokens()
      // 50 mantra usdc
    });
  }
}
