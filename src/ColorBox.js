import React, { Component } from 'react';
import "./ColorBox.css";
import { Link, withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        console.log(this.state.copied && "show");

        this.setState({
            copied: true
        }, () => {
                setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    
    render() {
        const { name, background, moreUrl } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background: background }} className="ColorBox">
                    {console.log(copied)}
                    <div className={`copy-overlay ${copied && "show"}`} style={{ background }}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{this.props.background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                    <button className="copy-button">Copy</button>
                    </div>
                    <Link to={moreUrl} onClick={e=> e.stopPropagation()}>
                        <span className="see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        )
    }
}
