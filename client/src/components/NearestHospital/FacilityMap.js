import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import SvgIcon from "../Icon/SvgIcon";
import { useTranslation } from "react-i18next";
import FacilityCard from "./FacilityCard";
import hospitalIcon from "../../assets/icons/hospital-map-marker.svg";
import doctorIcon from "../../assets/icons/doctor-map-marker.svg";
import pharmacyIcon from "../../assets/icons/pharmacy-map-marker.svg";

const INITIAL_STATE = {
  selectedFacility: {},
  showingInfoWindow: false,
};

const MapContainer = styled.div`
  margin: 2% auto;
  width: 100%;
  height: 100vh;
  minheight: 30rem;
  overflow: visible;
`;

const UserMarkerContainer = styled.div`
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background: #00008b;
  cursor: pointer;
`;

const MarkerContainer = styled.div`
  width: 20px;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  position: relative;
`;

const InfoWindowStyle = styled.div`
  position: absolute;
  left: -100px;
  white-space: wrap;
  z-index: 99;
`;

const FacilityMapUserMarker = ({ text, tooltip }) => (
  <UserMarkerContainer>
    <span title={tooltip}>{text}</span>
  </UserMarkerContainer>
);

const FacilityMapMarker = ({
  type,
  facility,
  showingInfoWindow,
  selectedFacility,
}) => {
  return (
    <>
      <MarkerContainer>
        <SvgIcon
          src={
            {
              hospital: hospitalIcon,
              doctor: doctorIcon,
              pharmacy: pharmacyIcon,
            }[type]
          }
        />
      </MarkerContainer>
      {showingInfoWindow &&
        facility &&
        selectedFacility &&
        facility.place_id === selectedFacility.place_id && (
          <InfoWindow facility={facility} />
        )}
    </>
  );
};

const InfoWindow = ({ facility }) => {
  return (
    <InfoWindowStyle>
      <FacilityCard
        key={facility.place_id}
        facilityName={facility.name}
        contactNo={facility.international_phone_number}
        periods={facility.opening_hours_periods}
        floating={true}
      />
    </InfoWindowStyle>
  );
};

const FacilityMap = (props) => {
  const { apiKey, defaultCenter, defaultZoom, facilities } = props;
  const [state, setState] = useState(INITIAL_STATE);
  const { t } = useTranslation();

  const onChildMouseEnter = (key) => {
    if (key === "userMarker") {
      return;
    }
    setState({
      selectedFacility: facilities.find((fac) => fac.place_id === key),
      showingInfoWindow: true,
    });
  };

  const onChildMouseLeave = (key) => {
    setState({
      selectedFacility: null,
      showingInfoWindow: false,
    });
  };

  const FacilityMarkers = facilities.map((facility) => {
    return (
      <FacilityMapMarker
        key={facility.place_id}
        type={facility.type}
        lat={facility.geometry_location.lat}
        lng={facility.geometry_location.lng}
        facility={facility}
        showingInfoWindow={state.showingInfoWindow}
        selectedFacility={state.selectedFacility}
      ></FacilityMapMarker>
    );
  });

  const createMapOptions = () => {
    return {
      gestureHandling: "greedy",
    };
  };

  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{
          lat: defaultCenter.coordinates[1],
          lng: defaultCenter.coordinates[0],
        }}
        defaultZoom={defaultZoom}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeave}
        yesIWantToUseGoogleMapApiInternals
        options={createMapOptions}
      >
        {
          <FacilityMapUserMarker
            key="userMarker"
            lat={defaultCenter.coordinates[1]}
            lng={defaultCenter.coordinates[0]}
            text={t("nearestHsp.you")}
            tooltip={t("nearestHsp.yourLocation")}
          />
        }
        {FacilityMarkers}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default FacilityMap;
