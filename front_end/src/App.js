import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { uploadCSV, uploadPDF, error, putData } from "./views";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={uploadCSV} exact />
          <Route path="/uploadPDF" component={uploadPDF} />
          <Route path="/putData" component={putData} />
          <Route component={error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
