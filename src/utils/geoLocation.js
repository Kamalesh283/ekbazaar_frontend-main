/* eslint-disable no-undef */
// set up the page

// var mapCanvas = document.getElementById("map_canvas");
// clg
// var geoBtn = document.querySelector(".enable");
// var revokeBtn = document.querySelector(".revoke");
// geoBtn.onclick = function () {
//   
// };

// revokeBtn.onclick = function () {
//   revokePermission();
// };

// draw the google map, or not

var positionDenied = function () {
  // geoBtn.style.display = "inline";
};

var revealPosition = function (position) {
  // geoBtn.style.display = "none";
  var markerTitle = "You are here";

  var latlng = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude
  );

  var myOptions = {
    zoom: 16,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  // var map = new google.maps.Map(mapCanvas, myOptions);

  // var marker = new google.maps.Marker({
  //   position: latlng,
  //   map: map,
  //   title: markerTitle,
  // });
};

// test for geolocation support, provide geolocation settings, determine location of the user's device
if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}

var geoSettings = {
  enableHighAccuracy: false,
  maximumAge: 30000,
  timeout: 20000,
};

// Start everything off

export function handlePermission() {
  navigator.permissions.query({ name: "geolocation" }).then(function (result) {
    if (result.state == "granted") {
      report(result.state);
      // geoBtn.style.display = "none";
    } else if (result.state == "prompt") {
      report(result.state);
      navigator.geolocation.getCurrentPosition(
        revealPosition,
        positionDenied,
        geoSettings
      );
    } else if (result.state == "denied") {
      report(result.state);
      // geoBtn.style.display = "inline";
    }
    result.onchange = function () {
      report(result.state);
    };
  });
}

function revokePermission() {
  navigator.permissions.revoke({ name: "geolocation" }).then(function (result) {
    report(result.state);
  });
}

function report(state) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      var latlng = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );

      new google.maps.Geocoder().geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // console.log(results)
        } else {
          // console.error(status);
        }
      }
      );


    }
  );

}

// handlePermission();
