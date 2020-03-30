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

const SymptomsCheck = () => {
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <div
        style={{
          display: "flex",
          margin: "10px 10px 10px 50px",
          padding: "100px"
        }}
      >
        <Link className="btn btn-outline-warning ist-group-item-action active mt-3 float-left">
          Welcome, purpose Disclaimer, must be over 18, US only
        </Link>
      </div>
      <span>
        {" "}
        <Link
          to="/medical"
          className="btn btn-outline-success mr-4 text-center"
        >
          Go Back
        </Link>
      </span>
      <span>
        {" "}
        <Link to="/page2" className="btn btn-outline-success mr-4 text-center">
          Next Page
        </Link>
      </span>
    </div>
  );
};

export default SymptomsCheck;
