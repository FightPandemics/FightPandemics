import React, { Component } from "react";
import NrMap from "./NrMap.js";
import "./NrMap.css";

class NearestHospital extends Component {
  render() {
    return (
      <div>
        <br />
        <h5 style={{ display: "flex", justifyContent: "center" }}>
          Your Nearest Hospital
        </h5>
        <div>
          <div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">United Hospital</h5>
                <div className="scrollable">
                  <p className="card-text">
                    HEALTHSOUTH REHABILITATION HOSPITAL OF CHARLESTON,Lorem
                    ipsum dolor sit amet
                  </p>
                  <p>Opens Mon-Fri 09:00 to 20:00</p>
                  <p style={{ color: "#425AF2" }}>(909) 090.0979</p>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">United Hospital</h5>
                  <div className="scrollable">
                    <p className="card-text">
                      HEALTHSOUTH REHABILITATION HOSPITAL OF CHARLESTON,Lorem
                      ipsum dolor sit amet
                    </p>
                    <p>Opens Mon-Fri 09:00 to 20:00</p>
                    <p style={{ color: "#425AF2" }}>(909) 090.0979</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="map-container">
            <NrMap />
          </div>
        </div>
      </div>
    );
  }
}
export default NearestHospital;
