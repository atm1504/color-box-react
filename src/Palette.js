import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css";


export default class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (
            <ColorBox background={color.color} name={color.name} />
        ));
        return (
            <div className="Palette">
                <h1>Palette</h1>
                {/* navbar here */}
                <div className="Palette-colors">
                    {/* bunch of colour boxes */}
                    {colorBoxes}
                </div>
                {/* Footer here */ }
            </div>
        )
    }
}
