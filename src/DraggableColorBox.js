import React from 'react';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/DraggableColorBoxStyles";
import chroma from 'chroma-js';

const Root = styled('div')(({ theme, color }) => ({
    ...styles.root,
    backgroundColor: color,
    '& .boxContent': {
        ...styles.boxContent,
        color: chroma(color).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"
    },
    '& .deleteIcon': {
        ...styles.deleteIcon,
        color: chroma(color).luminance() <= 0.08 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            color: "white",
            transform: "scale(1.3)",
            cursor: "pointer"
        }
    }
}));

function DraggableColorBox(props) {
    const { name, color, handleClick } = props;
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const onDeleteClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        handleClick();
    };

    return (
        <Root
            ref={setNodeRef}
            color={color}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div className="boxContent">
                <span>{name}</span>
                <DeleteIcon 
                    className="deleteIcon"
                    onClick={onDeleteClick}
                />
            </div>
        </Root>
    );
}

export default DraggableColorBox;