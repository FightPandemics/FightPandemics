import React, { Component, createRef } from "react";

const mapStyles = {
  width: "366px",
  height: "400px",
};
class NrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlang: [
        {
          X: 32.975799319000032,
          Y: -80.069978430999981,
        },
        {
          X: 34.989657431000062,
          Y: -81.942460234,
        },
        {
          X: 34.1614199300001,
          Y: -79.7531218139999,
        },
        {
          X: 47.844970178,
          Y: -120.00961263,
        },
        {
          X: 37.7785170700001,
          Y: -79.440954961,
        },
        {
          X: 34.6955306900001,
          Y: -82.98721979,
        },
      ],
      latitude: "",
      longitude: "",
      rec: [],
    };
    this.googleMapRef = React.createRef();
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
    });
    this.getMyLocation();
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },

      disableDefaultUI: true,
    });

  createMarker = () => {
    //markers fetched from the database
    this.state.latlang.map((e) => {
      new window.google.maps.Marker({
        position: {
          lat: e.X,
          lng: e.Y,
        },
        map: this.googleMap,
        type: "./firstaid.png",
      });
    });
    //current location marker
    new window.google.maps.Marker({
      position: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },
      map: this.googleMap,
    });
  };

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          this.setState({
            latitude: "err-latitude",
            longitude: "err-longitude",
          });
        },
      );
    }
  }
  render() {
    return (
      <div>
        <div id="google-map" ref={this.googleMapRef} style={mapStyles}></div>
      </div>
    );
  }
}

export default NrMap;
