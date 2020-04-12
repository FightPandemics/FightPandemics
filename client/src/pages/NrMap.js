import React, { Component, createRef } from "react";
import Script from "react-load-script";

const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;

const Wrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 4fr))",
  gridColumnGap: "0.5em",
};

const Nested = {
  height: "400px",
  overflowY: "auto",
};

const MapStyle = {
  margin: "2% auto",
  width: "100%",
  maxWidth: "800px",
  height: "50vh",
  minHeight: "300px",
};

class NrMap extends Component {
  constructor(props) {
    super(props);
  }

  handleScriptLoad() {
    let map;
    let pyrmont = new window.google.maps.LatLng(13.0827, 80.2707);

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 12,
      disableDefaultUI: true,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let pos = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          new window.google.maps.InfoWindow({
            map: map,
          });

          map.setCenter(pos);
          let service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(
            {
              location: pos,
              radius: 3000,
              type: ["hospital"],
            },
            function (results, status) {
              if (status !== "OK") return;
              createMarkers(results);
            },
          );

          function createMarkers(places) {
            let bounds = new window.google.maps.LatLngBounds();
            for (var i = 0, place; (place = places[i]); i++) {
              var request = {
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
              service.getDetails(request, callback);

              function callback(place, status) {
                if (
                  status == window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  let board = document.createElement("div");
                  let str = "";
                  str +=
                    '<div style="border: 1px solid #eee;box-shadow: 0 2px 6px #bababa;border-radius: 10px;padding: 20px;margin: 10px;">';
                  str += "<h3>" + place.name + "</h3>";
                  str +=
                    '<div><p class="card-text">' +
                    place.formatted_address +
                    '</p><p style="color: #425af2;" }>' +
                    place.formatted_phone_number +
                    "</p></div>";
                  let image = {
                    url: place.icon,
                    size: new window.google.maps.Size(71, 71),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(17, 34),
                    scaledSize: new window.google.maps.Size(25, 25),
                  };
                  new window.google.maps.Marker({
                    map: map,
                    icon: image,
                    title: place.name,
                    position: place.geometry.location,
                  });
                  bounds.extend(place.geometry.location);
                  board.innerHTML = str;
                  str = "";
                  document.getElementById("board").appendChild(board);
                }
                new window.google.maps.Marker({
                  map: map,
                  position: pos,
                });
                bounds.extend(pos);
              }
            }
          }
        },
        function () {
          handleNoGeolocation(true);
        },
      );
    } else {
      handleNoGeolocation(false);
    }

    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        var content = "Error: The Geolocation service failed.";
      } else {
        var content = "Error: Your browser doesn't support geolocation.";
      }

      var options = {
        map: map,
        position: new window.google.maps.LatLng(60, 105),
        content: content,
      };

      new window.google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }
  }

  render() {
    return (
      <div>
        <Script url={url} onLoad={this.handleScriptLoad} />
        <div style={Wrapper}>
          <div>
            <div style={Nested} id="board"></div>
          </div>
          <div>
            <div style={MapStyle} id="map"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NrMap;
