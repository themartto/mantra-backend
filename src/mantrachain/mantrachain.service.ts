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

    mint(receiver: string, amount: Long, txHash: string) {
        const metadata: MintMetadata = {
            receiver,
            amount,
            txHash,
        };

        return this.mantrachain.bridgeV1.mint(
            process.env.BRIDGE_CREATOR,
            process.env.BRIDGE_ID,
            metadata,
        );
    }

    getNftStake(
        marketplaceCreator: string,
        marketplaceId: string,
        collectionCreator: string,
        collectionId: string,
        nftId: string,
    ) {
        return this.mantrachain.vaultV1.getNftStake(
            marketplaceCreator,
            marketplaceId,
            collectionCreator,
            collectionId,
            nftId,
        );
    }

    setStaked(
        marketplaceCreator: string,
        marketplaceId: string,
        collectionCreator: string,
        collectionId: string,
        nftId: string,
        blockHeight: number,
        stakingChain: string,
        stakingValidator: string,
    ) {
        return this.mantrachain.vaultV1.setStaked(
            marketplaceCreator,
            marketplaceId,
            collectionCreator,
            collectionId,
            nftId,
            blockHeight,
            stakingChain,
            stakingValidator,
        );
    }

    startEpoch(
        blockStart: number,
        reward: string,
        stakingChain: string,
        stakingValidator: string,
    ) {
        return this.mantrachain.vaultV1.startEpoch(
            blockStart,
            reward,
            stakingChain,
            stakingValidator,
        );
    }
}
