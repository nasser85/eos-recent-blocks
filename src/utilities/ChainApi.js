import EosJs from 'eosjs'
import BlockApiWrapper from './BlockApiWrapper'

export default class ChainApi {
    static getChainInfo() {
        return fetch("https://api.eosnewyork.io/v1/chain/get_info")
                         .then(res => res.json())
                         .catch(err => { console.log(err) })
    }
    static async buildBlockApi() {
        let chainInfo = await this.getChainInfo()
        const eos = EosJs({
            expireInSeconds: 60,
            broadcast: true,
            debug: false,
            sign: true,
            httpEndpoint: 'https://api.eosnewyork.io',
            chainId: chainInfo.chain_id,
        })

        return new BlockApiWrapper(eos, chainInfo)

    }
}
