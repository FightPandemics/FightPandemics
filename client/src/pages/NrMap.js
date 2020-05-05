import React, { Component } from "react";
import styled from "styled-components";

const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;

const PhoneNo = styled.p`
  color: #425af2;
`;

const Wrapper = styled.div`
  display: block;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-template-rows: auto;
  align-items: stretch;
  grid-column-gap: 0.5em;
`;
const Nested = styled.div`
  height: 309px;
  overflow-y: auto;
`;
const MapStyle = styled.div`
  margin: 2% auto;
  width: 100%;
  maxwidth: 800px;
  height: 50vh;
  minheight: 300px;
`;
const Cards = styled.div`
  border: 1px solid #eee;
  box-shadow: 0 2px 6px #bababa;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
`;

class NrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 52.520008,
      longitude: 13.404954,
      rec: [],
      plcDtl: [],
    };
    this.googleMapRef = React.createRef();
  }
  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = url;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
      this.place = this.places();
    });
    this.getMyLocation();
  }
  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 13,
      center: {
        lat: this.state.latitude,
        lng: this.state.longitude,
      },
      disableDefaultUI: true,
    });
  places = () => {
    new window.google.maps.places.PlacesService(this.googleMap).nearbySearch(
      {
        location: {
          lat: this.state.latitude,
          lng: this.state.longitude,
        },
        radius: 3000,
        type: ["hospital"],
      },
      (results, status) => {
        if (status !== "OK") return;
        this.setState({ rec: results }, () => {
          console.log(this.state.rec.place_id);
          this.createMarker();
          this.placeDetails();
        });
      },
    );
  };

  placeDetails = () => {
    this.state.rec.map((place) => {
      let request = {
        placeId: place.place_id,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "opening_hours",
          "geometry",
          "icon",
        ],
      };
      new window.google.maps.places.PlacesService(this.googleMap).getDetails(
        request,
        (req, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            this.setState((prevState) => ({
              plcDtl: [...prevState.plcDtl, req],
            }));
          }
        },
      );
      return request;
    });
  };

  createMarker = () => {
    let image = {
      url: "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25),
    };
    this.state.rec.map((e) => {
      return new window.google.maps.Marker({
        position: {
          lat: e.geometry.location.lat(),
          lng: e.geometry.location.lng(),
        },
        icon: image,
        animation: window.google.maps.Animation.DROP,
        map: this.googleMap,
      });
    });
    new window.google.maps.Marker({
      position: { lat: this.state.latitude, lng: this.state.longitude },
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
    const list = this.state.plcDtl.map((place) => {
      return (
        <Cards>
          <h3>{place.name}</h3>
          <p>{place.formatted_address}</p>
          <PhoneNo>{place.formatted_phone_number}</PhoneNo>
        </Cards>
      );
    });
    return (
      <Wrapper>
        <Nested>{list}</Nested>
        <MapStyle id="google-map" ref={this.googleMapRef} />
      </Wrapper>
    );
  }
}

export default NrMap;
