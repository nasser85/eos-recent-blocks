export default class BlockApiWrapper {
    constructor(eosObject, chainInfo) {
        this.eosObject = eosObject
        this.chainInfo = chainInfo
        this.chain = []
    }
    retrieveMostRecentBlockNum() {
        return this.chainInfo.head_block_num
    }
}
