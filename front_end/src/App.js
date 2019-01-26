import React, { Component } from "react";
import "./App.css";
import axios from "axios";

const endpoint = "http://172.17.78.164:3000/api/api/save_data";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { file: "", loaded: 0 };
  }

  handleChange = e => {
    console.log("file change: ", e.target);
    this.setState({ file: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert("uploaded file");
    this.setState({
      file: e.target.value,
      loaded: 0
    });

    //request to Express endpoint
    axios
      .post(endpoint, this.state.file, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>PDF Filler</h1>

          <form onSubmit={this.handleSubmit}>
            <p>Upload a .csv file: </p>
            <input type="file" onChange={this.handleChange} />
            <input type="submit" />
          </form>
        </header>
      </div>
    );
  }
}

export default App;
