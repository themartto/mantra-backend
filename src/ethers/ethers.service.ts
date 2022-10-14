import { Injectable, Provider } from '@nestjs/common';
import { Contract, ethers, utils } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers/src.ts/json-rpc-provider';
import { hexZeroPad } from 'ethers/lib/utils';


@Injectable()
export class EthersService {
  provider: JsonRpcProvider

  constructor() {}

  async onModuleInit() {
    // TODO move the hardcoded values
    this.provider = new ethers.providers.WebSocketProvider('wss://goerli.infura.io/ws/v3/1e44b8c0d00d4bb7a9d66b8ea935a0a9');

    console.log(await this.provider.getNetwork())
    console.log('a')
    const  filter = {
      address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      topics: [
        // the name of the event, parnetheses containing the data type of each event, no spaces
        utils.id("Transfer(address,address,uint256)"),
        null,
        hexZeroPad('0x86AF458B3a817d42Eece5D8afB10455e3Ca202d7', 32)
      ]
    }
    this.provider.on(filter, (data) => {
      // do whatever you want here
      // I'm pretty sure this returns a promise, so don't forget to resolve it
      console.log(data);
    });

    console.log('b')
  }
}
