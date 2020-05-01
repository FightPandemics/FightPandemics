import React, { useReducer, useEffect, useRef } from "react";
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

const NrMap = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      latitude: 52.520008,
      longitude: 13.404954,
      rec: [],
      plcDtl: [],
    },
  );

  const googleMap = null;
  const marker = null;
  const place = null;

  const googleMapRef = useRef();

  const createGoogleMap = () =>
    new window.google.maps.Map(googleMapRef.current, {
      zoom: 13,
      center: {
        lat: state.latitude,
        lng: state.longitude,
      },
      disableDefaultUI: true,
    });

  const places = () => {
    new window.google.maps.places.PlacesService(state.googleMap).nearbySearch(
      {
        location: {
          lat: state.latitude,
          lng: state.longitude,
        },
        radius: 3000,
        type: ["hospital"],
      },
      (results, status) => {
        if (status !== "OK") return;
        console.log("places");

        setState({ rec: results });
        // createMarker();
        // placeDetails();
        // setState({ rec: results }, () => {
        //   console.log(state.rec.place_id);
        //   createMarker();
        //   placeDetails();
        // });
      },
    );
  };

  useEffect(() => {
    if (window.google) {
      console.log("state.rec");
      createMarker();
      placeDetails();
    }
  }, [state.rec]);

  const placeDetails = () => {
    state.rec.map((place) => {
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

      new window.google.maps.places.PlacesService(state.googleMap).getDetails(
        request,
        (req, status) => {
          console.log(state);
          console.log(status);
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(req);
            console.log(state);
            setState((prevState) => ({
              plcDtl: [...prevState.plcDtl, req],
            }));
          }
        },
      );
    });
  };

  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = url;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      state.googleMap = createGoogleMap();
      state.marker = createMarker();
      state.place = places();
    });

    getMyLocation();
  }, []);

  const createMarker = () => {
    let image = {
      url: "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25),
    };
    state.rec.map((e) => {
      new window.google.maps.Marker({
        position: {
          lat: e.geometry.location.lat(),
          lng: e.geometry.location.lng(),
        },
        icon: image,
        animation: window.google.maps.Animation.DROP,
        map: state.googleMap,
      });
    });
    new window.google.maps.Marker({
      position: { lat: state.latitude, lng: state.longitude },
      map: state.googleMap,
    });
  };

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setState({
            latitude: "err-latitude",
            longitude: "err-longitude",
          });
          error && console.log(error);
        },
      );
    }
  };

  return (
    <Wrapper>
      <Nested>
        {state.plcDtl.map((place, i) => (
          <Cards key={i}>
            <h3>{place.name}</h3>
            <p>{place.formatted_address}</p>
            <PhoneNo>{place.formatted_phone_number}</PhoneNo>
          </Cards>
        ))}
      </Nested>
      <MapStyle id="google-map" ref={googleMapRef} />
    </Wrapper>
  );
};

export default NrMap;
