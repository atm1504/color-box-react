import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import styles from "./styles/MiniPaletteStyles";
import DeleteIcon from "@mui/icons-material/Delete";

const Root = styled('div')(() => ({
    ...styles.root,
    '& .colors': styles.colors,
    '& .title': styles.title,
    '& .emoji': styles.emoji,
    '& .miniColor': styles.miniColor,
    '& .deleteIcon': styles.deleteIcon
}));

function MiniPalette(props) {
    const { paletteName, emoji, colors, id, goToPalette, openDialog } = props;

    const deletePalette = (e) => {
        e.stopPropagation();
        openDialog(id);
    };

    const handleClick = () => {
        goToPalette(id);
    };

    const miniColorBoxes = colors.map(color => (
        <div
            className="miniColor"
            style={{ backgroundColor: color.color }}
            key={color.name}
        />
    ));

    return (
        <Root onClick={handleClick}>
            <DeleteIcon
                className="deleteIcon"
                onClick={deletePalette}
            />
            <div className="colors">{miniColorBoxes}</div>
            <h5 className="title">
                {paletteName} <span className="emoji">{emoji}</span>
            </h5>
        </Root>
    );
}

export default memo(MiniPalette);