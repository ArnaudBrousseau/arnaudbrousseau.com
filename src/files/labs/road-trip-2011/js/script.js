/* Author: Arnaud Brousseau */
  var currentInfoWindow = null; //Will keep track of the opened infoWindow
                                //to avoid having two opened at the same time
  var createMap = function() {
    var paris = new google.maps.LatLng(48.857903,2.295072);
    var newYork = new google.maps.LatLng(40.774562,-73.872256); 
    var amherst = new google.maps.LatLng(42.371354,-72.516389);
    var boston = new google.maps.LatLng(42.34646,-71.08921);
    var washington = new google.maps.LatLng(38.897701,-77.036547);
    var newOrleans = new google.maps.LatLng(29.968134,-90.092296);
    var mobile = new google.maps.LatLng(30.565328,-88.208334);
    var tallahassee = new google.maps.LatLng(30.444724,-84.282165);
    var tampa = new google.maps.LatLng(27.951667,-82.456369);
    var northPorth = new google.maps.LatLng(27.038792,-82.278147);
    var miami = new google.maps.LatLng(25.774325,-80.142016);
    var keyWest = new google.maps.LatLng(24.547004,-81.786679);
    var everglades = new google.maps.LatLng(25.390006,-80.586869);
    var crocoFarm = new google.maps.LatLng(25.393273,-80.499963);
    var fortMyers = new google.maps.LatLng(26.446945,-81.941895);
    var coralCastle = new google.maps.LatLng(25.50033,-80.444309);
    var vegas = new google.maps.LatLng(36.084621,-115.152569);
    var sanFrancisco = new google.maps.LatLng(37.786275,-122.402477); //Hello Yelp :)
    var yosemite = new google.maps.LatLng(37.755668,-119.597271);

    var gmapOptions = {
      panControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
      zoom: 4,
      center: newYork,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Creates the map
    var roadmap = new google.maps.Map(document.getElementById("roadmap"), gmapOptions);

    //Adds the lines
    var tripDetails = [ paris, newYork, amherst, boston, washington, newOrleans,
        mobile, tallahassee, tampa, northPorth, fortMyers, miami, coralCastle, 
        everglades, crocoFarm, keyWest, vegas, yosemite, sanFrancisco ];
    var tripPath = new google.maps.Polyline({
        path: tripDetails,
        strokeColor: "#fe57a1",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    tripPath.setMap(roadmap);

    //Creates the modal windows, and binds them to the markers
    var createModal = function(contentId, position, title) {

      var content = document.getElementById(contentId).innerHTML;
      var infoWindow = new google.maps.InfoWindow({
        content: content
      });

      var marker = new google.maps.Marker({
        position: position ,
        map: roadmap,
        title: title
      });

      google.maps.event.addListener(marker, 'click', function() {
        if (currentInfoWindow !== null) { 
          currentInfoWindow.close();
        }
        infoWindow.open(roadmap, marker);
        currentInfoWindow = infoWindow;
      });
    };

    createModal("newYork", newYork, "New York City");
    createModal("amherst", amherst, "Amherst, UMASS and Quabbin Reservoir");
    createModal("boston", boston, "Boston's Liberty Trail");
    createModal("washington", washington, "Hello Barack!");
    createModal("newOrleans", newOrleans, "Jazz from New Orleans");
    createModal("fortMyers", fortMyers, "Fort Myers, Sanibel and Edison");
    createModal("miami", miami, "Miami Beach!");
    createModal("everglades", everglades, "Everglades, by night");
    createModal("coralCastle", coralCastle, "Ed's Coral Castle");
    createModal("keyWest", keyWest, "Key West");
    createModal("yosemite", yosemite, "Yosemite National Park");
    createModal("sanFrancisco", sanFrancisco, "San Francisco");

  };

  var displayMap = function() {
    //var divsToHide = document.getElementsByClassName("modal"); can't use that. Damn IE8!
    var divsToHide = document.getElementById("main").children;
    for (var i=0; i<divsToHide.length; i++){
      divsToHide[i].style.display = "none";
    }
    createMap();
    document.getElementById("roadmap").style.display = "block"; 
  };

  document.getElementById("switchToMapButton").addEventListener("click", displayMap, false);
