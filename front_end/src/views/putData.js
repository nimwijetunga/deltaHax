import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import pdf from "../health_form.pdf";
import jpg from "../health_form.jpg";
import "./putData.css";

const bob = [1, 2, 3];
const fields = ["Name", "Address", "Phone Number"];

class putData extends Component {
  render() {
    return (
      <div className="putData-wrapper">
        <img src={jpg} alt="a pdf" className="putData-img" />
        {bob.map((num, i) => (
          <React.Fragment>
            <div className="dropdown">
              <input id={num} type="text" />
              <div class="dropdown-content">
                {fields.map((field, i) => (
                  <p id={i} onClick={this.handleClick(field)}>
                    {field}
                  </p>
                ))}
              </div>
              <br />
              <br />
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  /*
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document file={pdf} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
  */
}

export default putData;
