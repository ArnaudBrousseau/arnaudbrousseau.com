var markPosition = function (lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng),
  marker = new google.maps.Marker({
    position: latlng,
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      strokeWeight: 2,
      scale: 6,
      fillColor: "black",
      fillOpacity: 0.7,
      strokeColor: "grey",
    },
    draggable: false,
    map: sfHills.mapHandler.map
  });
  sfHills.mapHandler.map.setCenter(latlng);
  sfHills.mapHandler.map.setZoom(16);
  
};

var locateUser = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      markPosition(position.coords.latitude, position.coords.longitude);
    }, function() {
      // Gelocation fallback: Defaults to Stockholm, Sweden
      alert("Geolocation failed. Sorry.");
    });
  }
}