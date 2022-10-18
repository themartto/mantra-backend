import { Injectable } from '@nestjs/common';
import { MantrachainSdk, SDKFactory } from '@mantrachain/sdk';
import { MintMetadata } from '@mantrachain/sdk/dist/src/types/bridge';

@Injectable()
export class MantrachainService {
  mantrachain: MantrachainSdk

  constructor() {}

  async onModuleInit() {
    // maybe mnemonic will be read from file
    this.mantrachain = await SDKFactory.init(
      {
        url: process.env.TENDERMINT_WS,
        mnemonic: 'material rare elegant alone hard equip know kite craft load insect season cream cruel excuse assault screen example witness addict antenna dawn junk tennis'
      }
    )
  }

  async mintTokens(receiver: string, amount: Long, txHash: string ) {
    const metadata: MintMetadata = {
      receiver,
      amount,
      txHash,
    }

    await this.mantrachain.bridgeV1.mint(
      process.env.BRIDGE_CREATOR,
      process.env.BRIDGE_ID,
      metadata
    )
  }
}
