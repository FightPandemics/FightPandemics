import React, { Component, createRef } from "react";

class Exp extends Component {
  googleMapRef = React.createRef();
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
    // this.googleMapRef = createRef();
  }
  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
      this.place = this.places();
    });
    this.getMyLocation();
  }
  // creates the map on the dom when the script gets loaded
  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 1,
      center: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },
      disableDefaultUI: true,
    });
  //......end of map creation.......

  places = () =>
    new window.google.maps.places.PlacesService(this.googleMap).nearbySearch(
      {
        location: {
          lat: this.state.latitude,
          lng: this.state.longitude,
        },
        radius: 3000,
        type: ["hospital"],
      },
      function (results, status) {
        if (status !== "OK") return;
        //locations are in this variable
        console.log(results);
        //this is not working .........
        //Cannot read property 'setState' of undefined
        //  this.setState({rec: results})
      },
    );

  //added code block for nearby hospitals.................
  //adding of this code also removes the markers form the map.. they apper if this block is commented

  // creating markers on the map using state. (locations hardcoded for now)
  createMarker = () => {
    this.state.latlang.map((e) => {
      new window.google.maps.Marker({
        position: {
          lat: e.X,
          lng: e.Y,
        },
        map: this.googleMap,
      });
    });
    new window.google.maps.Marker({
      position: { lat: this.state.latitude, lng: this.state.longitude },
      map: this.googleMap,
    });
  };

  //getting the current location of the browser
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
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: "400px", height: "300px" }}
      />
    );
  }
}

export default Exp;
