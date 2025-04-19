import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import styles from "./styles/ColorBoxStyles";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import chroma from "chroma-js";

const Root = styled('div')(({ theme, background, showingFullPalette }) => ({
  ...styles.root,
  backgroundColor: background,
  '& .copyOverlay': {
    ...styles.copyOverlay,
    backgroundColor: background
  },
  '& .copyOverlay.show': styles.showOverlay,
  '& .copyMessage': styles.copyMessage,
  '& .copyMessage.show': styles.showMessage,
  '& .copyText': {
    ...styles.copyText,
    color: theme => 
      chroma(background).luminance() >= 0.7 ? "black" : "white"
  },
  '& .colorName': {
    ...styles.colorName,
    color: theme =>
      chroma(background).luminance() <= 0.08 ? "white" : "black"
  },
  '& .seeMore': {
    ...styles.seeMore,
    color: theme =>
      chroma(background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white"
  },
  '& .copyButton': {
    ...styles.copyButton,
    color: theme =>
      chroma(background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white"
  },
  '& .boxContent': styles.boxContent
}));

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }
  render() {
    const {
      name,
      background,
      moreUrl,
      showingFullPalette
    } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <Root background={background} showingFullPalette={showingFullPalette}>
          <div
            className={classNames("copyOverlay", {
              show: copied
            })}
          />
          <div
            className={classNames("copyMessage", {
              show: copied
            })}
          >
            <h1>copied!</h1>
            <p className="copyText">{background}</p>
          </div>
          <div>
            <div className="boxContent">
              <span className="colorName">{name}</span>
            </div>
            <button className="copyButton">Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className="seeMore">MORE</span>
            </Link>
          )}
        </Root>
      </CopyToClipboard>
    );
  }
}
export default ColorBox;