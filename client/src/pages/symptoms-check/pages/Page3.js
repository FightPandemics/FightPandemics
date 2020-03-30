import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const CONTAINER_STYLES = {
  marginTop: "30px",
  width: "600px",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "space-between"
};

const Page3 = () => {
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <div
        style={{
          display: "flex",
          margin: "10px 10px 10px 50px",
          padding: "100px"
        }}
      >
        <Link
          to="/page3"
          className="btn btn-outline-warning ist-group-item-action active mt-3 float-left"
        >
          Are you experiencing any of these symptoms?
          <div class="list-group">
            <a href="#" className="list-group-item list-group-item-action">
              Fever or feeling feverish (chills, sweating)
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Difficulty breathing (not severe)
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Sore throat
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Whole body aches
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              Vomiting or diarrhea
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              None of the above
            </a>
          </div>
        </Link>
      </div>
      <Link to="/page4" className="btn btn-outline-success mr-4 text-center">
        Next Page
      </Link>
    </div>
  );
};

export default Page3;
