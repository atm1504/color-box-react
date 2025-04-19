import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { styled } from "@mui/material/styles";
import styles from "./styles/PaletteListStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { blue, red } from "@mui/material/colors";

const Root = styled('div')(() => ({
    ...styles.root,
    '& .container': styles.container,
    '& .nav': styles.nav,
    '& .palettes': styles.palettes,
    '& .heading': styles.heading,
    '& .fade-exit': {
        opacity: 1
    },
    '& .fade-exit-active': {
        opacity: 0,
        transition: 'opacity 500ms ease-out'
    }
}));

function PaletteList({ palettes, deletePalette }) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const navigate = useNavigate();

    const openDialog = (id) => {
        setOpenDeleteDialog(true);
        setDeletingId(id);
    };

    const closeDialog = () => {
        setOpenDeleteDialog(false);
        setDeletingId("");
    };

    const goToPalette = (id) => {
        navigate(`/palette/${id}`);
    };

    const handleDelete = () => {
        deletePalette(deletingId);
        closeDialog();
    };

    return (
        <Root>
            <div className="container">
                <nav className="nav">
                    <h1 className="heading">React Colors</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </nav>
                <TransitionGroup className="palettes">
                    {palettes.map(palette => (
                        <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                            <MiniPalette
                                {...palette}
                                goToPalette={goToPalette}
                                openDialog={openDialog}
                                key={palette.id}
                                id={palette.id}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <Dialog
                open={openDeleteDialog}
                aria-labelledby='delete-dialog-title'
                onClose={closeDialog}
            >
                <DialogTitle id='delete-dialog-title'>
                    Delete This Palette?
                </DialogTitle>
                <List>
                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{ bgcolor: blue[100], color: blue[600] }}
                            >
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Delete' />
                    </ListItem>
                    <ListItem button onClick={closeDialog}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Cancel' />
                    </ListItem>
                </List>
            </Dialog>
        </Root>
    );
}

export default PaletteList;