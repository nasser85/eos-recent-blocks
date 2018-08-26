import React, { Component } from 'react'
import '../styles/Block.css'
import eosIcon from '../styles/eos_icon.png'


export default class Block extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            expanded: false
        }
        this.toggleExpand = this.toggleExpand.bind(this)
    }
    toggleExpand() {
        let expanded = !this.state.expanded
        this.setState({ expanded })
    }
    render() {
        let block = this.state.data
        return (
            <div className="block-wrapper">
                <div className="block-card">
                <div className="eos-image-wrapper"><img className="eos-image" src={eosIcon} alt="Eos" /></div>
                    <div className="block-header">
                        <p>{block.id}</p>
                    </div>
                    <div className="block-footer">
                        <div className="block-footer-section">
                            <p className="footer-title">TIMESTAMP</p>
                            <p className="footer-text">{block.timestamp}</p>
                        </div>
                        <div className="block-footer-section">
                            <p className="footer-title">TRANSACTIONS</p>
                            <p className="footer-text">{block.transactions.length}</p>
                        </div>
                    </div>
                    <div className="block-footer">
                        <div className="block-footer-section">
                            <p className="footer-title">PRODUCER</p>
                            <p className="footer-text">{block.producer}</p>
                        </div>
                        <div className="block-footer-section">
                            <p className="footer-title">SIGNATURE</p>
                            <p className="footer-text">{block.producer_signature}</p>
                        </div>
                    </div>
                    <div className={ !this.state.expanded ? "raw-wrapper hidden" : "raw-wrapper"}>
                        <p className="footer-text">
                            {JSON.stringify(this.state.data)}
                        </p>
                    </div>
                    <p className="button-wrapper"><span onClick={this.toggleExpand} className="expand-button">{this.state.expanded ? "HIDE RAW DATA" : "SHOW RAW DATA"}</span></p>
                </div>
            </div>
        )
    }
}
