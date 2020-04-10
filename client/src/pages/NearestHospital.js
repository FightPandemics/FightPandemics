import React, { Component } from "react";
import NrMap from "./NrMap.js";

class NearestHospital extends Component {
  render() {
    return (
      <div>
        <br />
        <h5 style={{ display: "flex", justifyContent: "center" }}>
          Your Nearest Hospital
        </h5>
        <NrMap />
      </div>
    );
  }
}
export default NearestHospital;
