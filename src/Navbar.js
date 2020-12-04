import React, { Component } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "rc-slider/assets/index.css";
import Slider from 'rc-slider';
import "./Navbar.css";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex" };
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleColorChange(e) {
        console.log("Here");
        console.log(e);
        this.setState({
            format: e.target.value
        });
        console.log(e.target.value);
        this.props.handleChange(e.target.value);
    }
    render() {
        const { level, changeLevel } = this.props;
        const { format } = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="#">
                        reactcolorpicker
                    </a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100} />
                    </div>
                </div>
                <div className="select-container" >
                    <Select onChange={this.handleColorChange} value={format}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
            </header>
        )
    }
}
