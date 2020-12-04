import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import Palette from "./Palette";
import seedColors from "./seedColors";

import { generatePalette} from "./colorHelpers";
// import { Route } from 'react-router-dom';
function App() {
  console.log(generatePalette(seedColors[4]));
  return (
    <Switch>
      <Route exact path="/" render={()=><h1>Palette list goes here</h1>} />
      <Route exact path="/palette/:id" render={()=><h1>Individual palette</h1>} />
      {/* <div>
        <Palette palette={generatePalette(seedColors[4])}/>
        </div> */}
    </Switch>
  );
}

export default App;
