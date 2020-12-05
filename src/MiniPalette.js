import React from "react";
import { withStyles } from "@material-ui/styles";
import { yellow } from "@material-ui/core/colors";

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal",
        "& h1": {
            color:"white"
        }
    },
    secondary: {
        backgroundColor: "pink",
        "& h1": {
            color: "white",
            "& span": {
                backgroundColor:"yellow"
            }
        }
    }
}

function MiniPalette(props) {
    const { classes } = props;
    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>
                
                sdfghjkl 
            </section>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);