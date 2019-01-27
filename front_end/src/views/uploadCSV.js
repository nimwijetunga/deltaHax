import React, { Component } from "react";
import "./uploadCSV.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

const endpoint = "http://localhost:8000/api/save_data";

class uploadCSV extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, loaded: 0, redirect: false };
  }

  handleChange = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();

    const headers = { "Content-type": "multipart/form-data" };

    //request to Express endpoint
    // Send a POST request
    var formData = new FormData();
    formData.append("file", this.state.file, this.state.file.name);

    //formData.append("test", this.state.file);
    axios
      .post(endpoint, formData, {
        headers: headers
      })
      .then(res => {
        alert("go fk yourself");
        this.setState({ redirect: true });
      });
  };

  render() {
    const { redirect } = this.state;

    return redirect ? (
      <Redirect to="/uploadPDF" />
    ) : (
      <div className="App">
        <header className="App-header">
          <h1>PDF Filler</h1>

          <form onSubmit={this.handleSubmit}>
            <p>Upload a .csv file: </p>
            <input type="file" name="" id="" onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default uploadCSV;
