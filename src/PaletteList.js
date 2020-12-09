import React, { Component } from 'react';
import MiniPalette from "./MiniPalette";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
     }
    render() {
        const { palettes, classes, deletePalette } = this.props;
         return (
             <div className={classes.root}>
                 <div className={classes.container}>
                     <nav className={classes.nav}>
                         <h1 className={classes.heading}>React Colors</h1>
                         <Link to="/palette/new">Create Palette</Link>
                     </nav>
                     <TransitionGroup className={classes.palettes}>
                         {palettes.map(pa => (
                             <CSSTransition key={pa.id} classNames='fade' timeout={500}>
                                <MiniPalette
                                    {...pa}
                                    handleClick={() => this.goToPalette(pa.id)}
                                    handleDelete={deletePalette}
                                    key={pa.id}
                                    id={pa.id}
                                />
                             </CSSTransition>
                 ))}
                     </TransitionGroup>
                 </div>
             </div>
         )
     }
 }
export default withStyles(styles)(PaletteList);