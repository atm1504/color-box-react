import React, { Component } from 'react';
import "rc-slider/assets/index.css";
import Slider from 'rc-slider';
import "./Navbar.css";

export default class Navbar extends Component {
    
    render() {
        const { level, changeLevel } = this.props;
        return (
            <div className="Navbar">
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
            </div>
        )
    }
}
