import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import DraggableColorList from "./DraggableColorList";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

const drawerWidth = 400;

const Root = styled('div')(({ theme }) => ({
    ...styles.root,
    display: 'flex',
    '& .drawer': styles.drawer,
    '& .drawerPaper': {
        ...styles.drawerPaper,
        width: drawerWidth
    },
    '& .drawerHeader': {
        ...styles.drawerHeader,
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    '& .content': styles.content,
    '& .contentShift': styles.contentShift,
    '& .container': styles.container,
    '& .buttons': styles.buttons,
    '& .button': styles.button
}));

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flexGrow: 1,
    minHeight: '100vh',
    padding: 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    '& .drawerHeader': {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

function NewPaletteForm(props) {
    const { maxColors = 20, palettes, savePalette } = props;
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [colors, setColors] = useState(seedColors[0].colors);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addNewColor = (newColor) => {
        setColors([...colors, newColor]);
    };

    const clearColors = () => {
        setColors([]);
    };

    const addRandomColor = () => {
        const allColors = palettes.map(p => p.colors).flat();
        let rand;
        let randomColor;
        let isDuplicateColor = true;
        while (isDuplicateColor) {
            rand = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[rand];
            isDuplicateColor = colors.some(
                color => color.name === randomColor.name
            );
        }
        setColors([...colors, randomColor]);
    };

    const handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = colors;
        savePalette(newPalette);
        navigate("/");
    };

    const removeColor = (colorName) => {
        setColors(colors.filter(color => color.name !== colorName));
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newColors = [...colors];
        const [removed] = newColors.splice(oldIndex, 1);
        newColors.splice(newIndex, 0, removed);
        setColors(newColors);
    };

    const paletteIsFull = colors.length >= maxColors;

    return (
        <Root>
            <PaletteFormNav
                open={open}
                palettes={palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Drawer
                className="drawer"
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: "drawerPaper"
                }}
            >
                <div className="drawerHeader">
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <div className="container">
                    <Typography variant="h4" gutterBottom>
                        Design Your Palette
                    </Typography>
                    <div className="buttons">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={clearColors}
                            className="button"
                        >
                            Clear Palette
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="button"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        addNewColor={addNewColor}
                        colors={colors}
                    />
                </div>
            </Drawer>
            <Main
                open={open}
            >
                <div className="drawerHeader" />
                <div style={{ height: 'calc(100vh - 64px)' }}>
                    <DraggableColorList
                        colors={colors}
                        removeColor={removeColor}
                        onSortEnd={onSortEnd}
                    />
                </div>
            </Main>
        </Root>
    );
}

export default NewPaletteForm;