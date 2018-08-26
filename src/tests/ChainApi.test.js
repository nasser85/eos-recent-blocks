import 'babel-polyfill'
import ChainApi from '../utilities/ChainApi'
import BlockApiWrapper from '../utilities/BlockApiWrapper'


describe("The ChainApi Class", () => {
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


  it("has getChainInfo and buildBlockApi method", () => {
    expect(ChainApi.getChainInfo).toBeDefined();
    expect(ChainApi.buildBlockApi).toBeDefined();
  });

  it("has getChainInfo method which returns Chain Info", () => {
      expect(chainObject.chain_id).toBeDefined();
      expect(chainObject.head_block_num).toBeDefined();
  });

  it("has buildBlockApi method which returns instance of BlockApiWrapper", () => {
      expect(blockApiObject instanceof BlockApiWrapper).toBeTruthy();
  });
});

