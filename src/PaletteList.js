import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
 
export default class PaletteList extends Component {
    render() {
        const { palettes } = this.props;
         return (
             <div>
                 <h1>React Colors</h1>
                 <MiniPalette/>
                 {palettes.map(pa => (
                    <p>
                        <Link to={`/palette/${pa.id}`}>
                            {pa.paletteName}
                        </Link>
                    </p>
                 ))}
             </div>
         )
     }
 }
 