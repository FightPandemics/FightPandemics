import React, { Component } from "react";
import NrMap from "./NrMap.js";

class NearestHospital extends Component {
  render() {
    return (
      <div>
        <br />
        <h2>Your Nearest Hospital</h2>
        <NrMap />
      </div>
    );
  }
}
export default NearestHospital;
