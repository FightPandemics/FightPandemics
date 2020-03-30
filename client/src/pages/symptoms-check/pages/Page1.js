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

const Page1 = () => {
  return (
    <div className="text-center mx-auto" style={CONTAINER_STYLES}>
      <div
        style={{
          display: "flex",
          margin: "30px 10px 10px 50px",
          padding: "100px"
        }}
      >
        <Nav variant="med-info">
          <Link
            to="/page2"
            className="btn btn-outline-danger mt-150 mr-4 float-left"
          >
            Call 911 if you have any extreme or life threatening symptoms
            including constant chest pain or pressure, extreme difficulty
            breathing or severe shortness of breath, severe constant dizziness
            or lightheadedness, slurred speech, or difficulty waking up.
          </Link>
        </Nav>
      </div>
    </div>
  );
};

export default Page1;
