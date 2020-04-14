import React, { Component } from "react";
import NrMap from "./NrMap.js";
import Exp from "./mapexample.js";

class NearestHospital extends Component {
  render() {
    return (
      <div>
        <br />
        <h2>Your Nearest Hospital</h2>
        <NrMap />
        {/* <Exp /> */}
      </div>
    );
  }
}
export default NearestHospital;
