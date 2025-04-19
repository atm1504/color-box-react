import sizes from "./sizes";
import chroma from "chroma-js";

const PREFIX = 'DraggableColorBox';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        },
        "&:hover $boxContent": {
            width: "60%",
            padding: "0 4px",
            fontSize: "1rem",
            transition: "all 0.3s ease-in-out"
        },
        "&:hover $deleteIcon": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "50%",
        height: "20%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5px",
        color: "rgba(255, 255, 255, 0.7)",
        textTransform: "uppercase",
        fontSize: "0.8rem"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            color: "white"
        }
    },
    [sizes.down("lg")]: {
        root: {
            width: "25%",
            height: "20%"
        }
    },
    [sizes.down("md")]: {
        root: {
            width: "50%",
            height: "10%"
        }
    },
    [sizes.down("sm")]: {
        root: {
            width: "100%",
            height: "5%"
        }
    }
};

export default styles;