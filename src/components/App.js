import React, { Component } from 'react'
import '../styles/App.css'

import ChainApi from '../utilities/ChainApi'
import Block from './Block'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chain: [],
            blockNum: null,
            eos: null
        }
        this.renderBlock = this.renderBlock.bind(this)
        this.loadRecentBlocks = this.loadRecentBlocks.bind(this)
        this.refreshLoad = this.refreshLoad.bind(this)
    }
    componentDidUpdate() {
        if (this.state.chain.length < 10) {
            this.state.eos.getBlock(this.state.blockNum)
            .then( block => {
                let chain = this.state.chain
                let blockNum = this.state.blockNum - 1
                chain.push(block)
                this.setState({
                    chain,
                    blockNum
                })
            })
            .catch( err => { console.log(err) })
        }
    }
    componentDidMount() {
       this.loadRecentBlocks()
    }
    loadRecentBlocks() {
        ChainApi.buildBlockApi()
           .then(blockApi => {
                let blockNum = blockApi.retrieveMostRecentBlockNum()
                let eos = blockApi.eosObject
                this.setState({ blockNum, eos })
           })
           .catch(err => { console.log(err) })
    }
    refreshLoad() {
        this.setState({ chain: [] }, this.loadRecentBlocks)
    }
    renderBlock(data) {
        return (
            <Block id={data.id}
                   key={data.block_num}
                   data={data}></Block>
        )
    }
    render() {
        return (
            <div className="main-wrapper">
                <div className="main-header">
                    <h1>EOS.IO RECENT BLOCKS</h1>
                    <p className="load-button-wrapper"><span onClick={this.refreshLoad} className="load-button">LOAD RECENT BLOCKS</span></p>
                </div>
                <div className="main-container">
                    { this.state.chain.map(this.renderBlock) }
                </div>
            </div>
        )
    }
}
