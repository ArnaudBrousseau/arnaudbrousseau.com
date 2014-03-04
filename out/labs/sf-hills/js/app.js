// Namespace stuff
window.sfHills = window.sfHills || {};

$(document).ready(function(){
  
  // Show the buttons
  if (navigator.geolocation) {
    $("#geo-tracker").show(500);
  }
  //$("#mode-switch").show(500);
  
  //Do the bindings
  $("#geo-tracker").click(function(){
    locateUser();
  });
  
  sfHills.mapHandler.init();
  
});