import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { styled } from "@mui/material/styles";
import styles from "./styles/ColorPickerFormStyles";

const PREFIX = 'ColorPickerForm';
const classes = {
    picker: `${PREFIX}-picker`,
    colorNameInput: `${PREFIX}-colorNameInput`,
    addColor: `${PREFIX}-addColor`
};

const Root = styled('div')(({ theme }) => ({
    ...styles
}));

function ColorPickerForm({ paletteIsFull, addNewColor, colors }) {
    const [currentColor, setCurrentColor] = useState("teal");
    const [newColorName, setNewColorName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
            colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
            colors.every(({ color }) => color !== currentColor)
        );
    }, [colors, currentColor]);

    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    };

    const handleChange = (evt) => {
        setNewColorName(evt.target.value);
    };

    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };
        addNewColor(newColor);
        setNewColorName("");
    };

    return (
        <Root>
            <ChromePicker
                color={currentColor}
                onChangeComplete={updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                <TextValidator
                    value={newColorName}
                    name="newColorName"
                    variant="filled"
                    placeholder="Color Name"
                    margin="normal"
                    className={classes.colorNameInput}
                    onChange={handleChange}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={[
                        "Enter a color name",
                        "Color name must be unique",
                        "Color already used!"
                    ]}
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={paletteIsFull}
                    className={classes.addColor}
                    sx={{
                        backgroundColor: paletteIsFull ? "grey" : currentColor
                    }}
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </Root>
    );
}

export default ColorPickerForm;