import React, { useState, useEffect, useRef } from "react";
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

const map = {
  googleMap: null,
  marker: null,
  place: null,
};

const NrMap = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
  });
  // rec-> list of hospitals according to nearbySearch
  const [rec, setRec] = useState([]);
  // plcDtl-> list of hospitals with requested details
  const [plcDtl, setPlcDtl] = useState(() => []);

  const googleMapRef = useRef();

  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = url;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      map.googleMap = createGoogleMap();
      map.marker = createMarker();
      map.place = places();
    });

    getMyLocation();
  }, []);

  const createGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      zoom: 13,
      center: {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
      },
      disableDefaultUI: true,
    });
  };

  const places = () => {
    new window.google.maps.places.PlacesService(map.googleMap).nearbySearch(
      {
        location: {
          lat: coordinates.latitude,
          lng: coordinates.longitude,
        },
        radius: 3000,
        type: ["hospital"],
      },
      (results, status) => {
        if (status !== "OK") return;
        setRec(results);
      },
    );
  };

  useEffect(() => {
    if (rec && rec.length > 0) {
      placeDetails();
      createMarker();
    }
  }, [rec]);

  const placeDetails = () => {
    console.log("placeDetails");

    rec.map((place) => {
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

      new window.google.maps.places.PlacesService(map.googleMap).getDetails(
        request,
        (req, status) => {
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            setPlcDtl((prevState) => {
              return [...prevState, req];
            });
          }
        },
      );
    });
  };

  const createMarker = () => {
    let image = {
      url: "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
      size: new window.google.maps.Size(71, 71),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(17, 34),
      scaledSize: new window.google.maps.Size(25, 25),
    };
    rec.map((e) => {
      new window.google.maps.Marker({
        position: {
          lat: e.geometry.location.lat(),
          lng: e.geometry.location.lng(),
        },
        icon: image,
        animation: window.google.maps.Animation.DROP,
        map: map.googleMap,
      });
    });
    new window.google.maps.Marker({
      position: { lat: coordinates.latitude, lng: coordinates.longitude },
      map: map.googleMap,
    });
  };

  const getMyLocation = () => {
    console.log("getMyLocation");

    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  return (
    <Wrapper>
      <Nested>
        {plcDtl.map((place) => {
          return (
            <Cards key={`card-${place.name}`}>
              <h3>{place.name}</h3>
              <p>{place.formatted_address}</p>
              <PhoneNo>{place.formatted_phone_number}</PhoneNo>
            </Cards>
          );
        })}
      </Nested>
      <MapStyle id="google-map" ref={googleMapRef} />
    </Wrapper>
  );
};

export default NrMap;
