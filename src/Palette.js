import React, { Component } from 'react';
import "rc-slider/assets/index.css";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Slider from 'rc-slider';



export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel }); 
    }
    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div className="Palette">
                {/* navbar here */}
                <div className="slider">
                    <Slider defaultValue={level} min={100} max={900} onAfterChange={this.changeLevel} step={100} />
                </div>
                <div className="Palette-colors">
                    {/* bunch of colour boxes */}
                    {colorBoxes}
                </div>
                {/* Footer here */ }  
            </div>
        )
    }
}
