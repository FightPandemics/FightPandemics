import React, { Component, createRef } from "react";
import Script from "react-load-script";
import "./styles/NrMap.css";

const url = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places`;

class NrMap extends Component {
  constructor(props) {
    super(props);
  }

  handleScriptLoad() {
    var map;
    var pyrmont = new window.google.maps.LatLng(13.0827, 80.2707);

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 12,
      disableDefaultUI: true,
    });

    var marker = new window.google.maps.Marker({
      position: pyrmont,
      map: map,
      draggable: true,
    });

    marker.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          var infowindow = new window.google.maps.InfoWindow({
            map: map,
            // position: pos,
            // content: 'Great! your location is found.'
          });

          map.setCenter(pos);
          var service = new window.google.maps.places.PlacesService(map);
          service.nearbySearch(
            {
              location: pos,
              radius: 3000,
              type: ["hospital"],
            },
            function (results, status, pagination) {
              if (status !== "OK") return;

              createMarkers(results);
              pagination.hasNextPage &&
                function () {
                  pagination.nextPage();
                };
            },
          );

          function createMarkers(places) {
            var bounds = new window.google.maps.LatLngBounds();
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
                  var board = document.createElement("div");
                  board.className = "card";
                  var str = "";
                  console.log(place);
                  str += '<div class="card-body">';
                  str += '<h3 class="card-title">' + place.name + "</h3>";
                  str +=
                    '<div><p class="card-text">' +
                    place.formatted_address +
                    '</p><p style="color: #425af2;" }>' +
                    place.formatted_phone_number +
                    "</p></div>";
                  var image = {
                    url: place.icon,
                    size: new window.google.maps.Size(71, 71),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(17, 34),
                    scaledSize: new window.google.maps.Size(25, 25),
                  };
                  var marker = new window.google.maps.Marker({
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

      var infowindow = new window.google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }
  }

  render() {
    return (
      <div>
        <Script url={url} onLoad={this.handleScriptLoad} />
        <div className="wrapper">
          <div className="division">
            <div className="nested" id="board"></div>
          </div>
          <div className="division">
            <div id="map"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default NrMap;
