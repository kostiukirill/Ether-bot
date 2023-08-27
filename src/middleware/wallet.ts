import { EtherscanProvider } from 'ethers'; //^v6



export class MyEtherscanProvider extends EtherscanProvider {
    constructor(networkish: string, apiKey: string) {
        super(networkish, apiKey);
    }
    async getHistory(address: string, startBlock?: string, endBlock?: string) {
        const params = {
            action: "txlist",
            address,
            startblock: ((startBlock == null) ? 0 : startBlock),
            endblock: ((endBlock == null) ? 99999999 : endBlock),
            sort: "asc"
        };
        return this.fetch("account", params)
    }
}
