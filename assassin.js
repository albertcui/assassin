var map;
if (Meteor.isClient) {
  
    
  // counter starts at 0 
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
        
  //         hello: function() 
  //         {
  //             return "Hi";
  //         }
    },
    initialize: function(){
      var mapOptions = {
        zoom: 6
      };

      map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
       // Try HTML5 geolocation
       if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
           position.coords.longitude);

          var infowindow = new google.maps.InfoWindow({
            map: map,
            position: pos,
            content: 'Location found using HTML5.'
          });

          map.setCenter(pos);
        }, function() {
          handleNoGeolocation(true);
        });
      } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
      }
      google.maps.event.addDomListener(window, 'load', initialize);

    },


    handleNoGeolocation: function(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infowindow = new google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }
  });


  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });



}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



/*
 * var layer = "toner";
var map = new google.maps.Map(document.getElementById("element_id"), {
    center: new google.maps.LatLng(37.7, -122.4),
    zoom: 12,
    mapTypeId: layer,
    mapTypeControlOptions: {
        mapTypeIds: [layer]
    }
});
map.mapTypes.set(layer, new google.maps.StamenMapType(layer));

 */
