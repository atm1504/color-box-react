import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import seedColors from "./seedColors";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import "./App.css";
import Page from "./Page";

function App() {
  const location = useLocation();
  const [palettes, setPalettes] = useState(() => {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    return savedPalettes || seedColors;
  });

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const findPalette = (id) => {
    return palettes.find((palette) => palette.id === id);
  };

  const deletePalette = (id) => {
    setPalettes((prevPalettes) =>
      prevPalettes.filter((palette) => palette.id !== id)
    );
  };

  const savePalette = (newPalette) => {
    setPalettes((prevPalettes) => [...prevPalettes, newPalette]);
  };

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm
                  savePalette={savePalette}
                  palettes={palettes}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                {(() => {
                  const paletteId = location.pathname.split("/")[2];
                  const foundPalette = findPalette(paletteId);
                  if (!foundPalette) {
                    return <Navigate to="/" replace />;
                  }
                  return (
                    <SingleColorPalette
                      colorId={location.pathname.split("/").pop()}
                      palette={generatePalette(foundPalette)}
                    />
                  );
                })()}
              </Page>
            }
          />
          <Route
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                {(() => {
                  const foundPalette = findPalette(location.pathname.split("/").pop());
                  if (!foundPalette) {
                    return <Navigate to="/" replace />;
                  }
                  return <Palette palette={generatePalette(foundPalette)} />;
                })()}
              </Page>
            }
          />
          <Route
            path="*"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;