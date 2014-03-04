sfHills.mapHandler = {
  map: null,
  
  init: function() {
    this.map = new google.maps.Map(document.getElementById('sf-hills-baby'), {
      center: new google.maps.LatLng(37.78374, -122.445374),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
    });
    var styles = [
       {
         stylers: [{hue: "#00ffe6"}, {saturation: -80}]
       },{
         featureType: "road",
         elementType: "geometry",
         stylers: [{lightness: 100},{visibility: "simplified"}]
       }
     ];
     this.map.setOptions({styles: styles});
     
     for (streetPath in streetCrossingsGeocoded) {
       if (streetCrossingsGeocoded.hasOwnProperty(streetPath)) {
         this.drawStreetOverlay(streetPath);
       }
     }
  },
  
  
  // Draw a street path, defined as an array of {lng, lat, alt} points
  drawStreetOverlay: function(streetPath) {
    var i;
    for (var i=0; i<streetCrossingsGeocoded[streetPath].length-1; i++) {
      // Draw a block only if we have at least 2 crossings to work with
      this.drawBlock(streetCrossingsGeocoded[streetPath][i], streetCrossingsGeocoded[streetPath][i+1]);
    }
  },

  drawBlock: function(start, end) {
    // Compute the color for the line
    var rgbValue = this.computeHexColor(start, end);
    var line = new google.maps.Polyline({
      path: [
        new google.maps.LatLng(start.lat, start.lng),
        new google.maps.LatLng(end.lat, end.lng),
      ],
      strokeColor: rgbValue,
      strokeOpacity: 0.4,
      strokeWeight: 4, 
      clickable: false
    });
    line.setMap(this.map);
  },

  computeHexColor: function(start, end) {
    // Given two points, compute the color of the path
    // Red means super steep, green means flat

    var distance = Math.sqrt(Math.abs(start.lat - end.lat)*Math.abs(start.lat - end.lat) + Math.abs(start.lng - end.lng)*Math.abs(start.lng - end.lng));
    var elevation = Math.abs(start.alt - end.alt);
    var slope = elevation/distance;
    if (slope > 16500) {
      /* Sanity check*/
      slope = 16500;
    }

    var normalizedSlope = slope/16500; // varies from 0 to 1. Woo!

    // Green is 1/3, 1, 0.5 in HSL
    // Red is 0, 1, 0.5
    // So we make the hue vary from 0 to 1/3. Nothing fancy.
    var rgbColor = this.hslToRgb(0.6*(1-normalizedSlope), 1, 0.5);
    var hexColor = '#' + this.rgbComponentTohex(rgbColor[0]) 
        + this.rgbComponentTohex(rgbColor[1]) 
        + this.rgbComponentTohex(rgbColor[2]);

    return hexColor;
  },

  hslToRgb: function(h, s, l){
      var r, g, b;

      if(s == 0){
          r = g = b = l; // achromatic
      }else{
          function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
          }

          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1/3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1/3);
      }
      return [r*255, g*255, b*255];
  },

  rgbComponentTohex: function(rgbComponent) {
    //Converts 255 to "ff" and 0 to "00"
    if (parseInt(rgbComponent).toString(16).length === 2) {
      return parseInt(rgbComponent).toString(16);
    } else {
      return parseInt(rgbComponent).toString(16) + parseInt(rgbComponent).toString(16);
    }
  }
}