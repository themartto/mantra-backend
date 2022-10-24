import { Injectable } from '@nestjs/common';
import { MantrachainSdk, SDKFactory } from '@mantrachain/sdk';
import { MintMetadata } from '@mantrachain/sdk/dist/src/types/bridge';

@Injectable()
export class MantrachainService {
  mantrachain: MantrachainSdk;

  constructor() {
  }

  async onModuleInit() {
    // maybe mnemonic will be read from file
    this.mantrachain = await SDKFactory.init(
      {
        url: process.env.TENDERMINT_WS,
        mnemonic: process.env.MANTRA_MNEMONIC,
      },
    );
  }

  async mintTokens(receiver: string, amount: Long, txHash: string) {
    const metadata: MintMetadata = {
      receiver,
      amount,
      txHash,
    };

    console.log({
      'data': {
        id: process.env.BRIDGE_ID,
        creator: process.env.BRIDGE_CREATOR,
        metadata: metadata,
      },
    });

    const mintResp = await this.mantrachain.bridgeV1.mint(
      process.env.BRIDGE_CREATOR,
      process.env.BRIDGE_ID,
      metadata,
    );

    console.log(mintResp);
  }
}
