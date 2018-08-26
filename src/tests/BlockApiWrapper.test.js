import 'babel-polyfill'
import ChainApi from '../utilities/ChainApi'
import BlockApiWrapper from '../utilities/BlockApiWrapper'


describe("The BlockApiWrapper Class", () => {

    var chainObject, blockApiObject;
    beforeAll(done => {
      ChainApi.getChainInfo()
      .then( chainInfo => {
        chainObject = chainInfo
        ChainApi.buildBlockApi()
          .then( blockApiRes => {
            blockApiObject = blockApiRes
            done()
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => {console.log(err) })
    });


  it("contains an instance of the Eos-js Api object", () => {
    expect(blockApiObject.eosObject.getBlock).toBeDefined();
  });

  it("contains chain info", () => {
      expect(chainObject.chain_id).toEqual(blockApiObject.chainInfo.chain_id);
      expect(blockApiObject.chainInfo.head_block_num).toBeDefined();
  });

  it("has retrieveMostRecentBlockNum method which retrieves correct head_block_num", () => {
      expect(blockApiObject.chainInfo.head_block_num).toEqual(blockApiObject.retrieveMostRecentBlockNum());
  });
});
