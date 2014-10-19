Players = new Mongo.Collection("players");

var marker;

function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
       Players.update(Players.findOne({name: "test"})._id, {$set: {lat: position.coords.latitude, lon: position.coords.longitude}})
       marker.setPosition(
           new google.maps.LatLng(
               position.coords.latitude,
               position.coords.longitude)
       );
    });
  }
}

if (Meteor.isClient) {

  Template.map.rendered = function() {
    var layer = "toner";
    var myLatlng1 = new google.maps.LatLng(53.65914, 0.072050);
    var mapOptions = {
      zoom: 8,
      mapTypeId: layer,
      mapTypeControlOptions: {
        mapTypeIds: [layer]
      }
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    map.mapTypes.set(layer, new google.maps.StamenMapType(layer));

    marker = new google.maps.Marker({
        position: myLatlng1,
        map: map,
        title: 'Hello World!'
      });

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
        map.setZoom(18);
        marker.setPosition(initialLocation);
      });

    }

    Meteor.setInterval(getLocation, 1000)
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0)
      Players.insert({name: "test"});
  });
}
