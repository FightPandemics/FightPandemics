import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";

const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;
const default_latitude = 52.520008;
const default_longitude = 13.404954;

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

const NrMap = () => {
    const [coordinates, setCoordinates] = useState({
        latitude: default_latitude,
        longitude: default_longitude,
    });
    const [hospitals, setHospitals] = useState([]);
    const [detailedHospitals, setDetailedHospitals] = useState([]);

    const googleMapRef = useRef();
    const googleMap = useRef();

    useEffect(() => {
        const googleMapScript = document.createElement("script");
        googleMapScript.src = url;
        window.document.body.appendChild(googleMapScript);

        googleMapScript.addEventListener("load", () => {
            googleMap.current = createGoogleMap();
            createMarker();
            places();
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
        new window.google.maps.places.PlacesService(googleMap.current).nearbySearch(
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
                setHospitals(results);
            },
        );
    };

    useEffect(() => {
        if (hospitals && hospitals.length > 0) {
            createMarker();
            placeDetails();
        }
    }, [hospitals]);

    const placeDetails = () => {
        hospitals.map((place) => {
            const request = {
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

            new window.google.maps.places.PlacesService(googleMap.current).getDetails(
                request,
                (req, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        setDetailedHospitals((detailedHospitals) => {
                            return [...detailedHospitals, req];
                        });
                    }
                },
            );
        });
    };

    const createMarker = () => {
        const image = {
            url: "https://maps.gstatic.com/mapfiles/place_api/icons/doctor-71.png",
            size: new window.google.maps.Size(71, 71),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(17, 34),
            scaledSize: new window.google.maps.Size(25, 25),
        };
        hospitals.map((e) => {
            new window.google.maps.Marker({
                position: {
                    lat: e.geometry.location.lat(),
                    lng: e.geometry.location.lng(),
                },
                icon: image,
                animation: window.google.maps.Animation.DROP,
                map: googleMap.current,
            });
        });
        new window.google.maps.Marker({
            position: { lat: coordinates.latitude, lng: coordinates.longitude },
            map: googleMap.current,
        });
    };

    const getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation;

        if (location) {
            location.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setCoordinates({
                        latitude: "err-latitude",
                        longitude: "err-longitude",
                    });
                },
            );
        }
    };

    return (
        <Wrapper>
            <Nested>
                {detailedHospitals.map((place) => {
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
