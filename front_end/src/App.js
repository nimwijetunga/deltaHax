import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { uploadCSV } from "./views";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={uploadCSV} />
      </BrowserRouter>
    );
  }
}

export default App;
