Players = new Mongo.Collection("players");

var marker;

function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      if (Meteor.user())
       Players.update(Meteor.userid, {$set: {lat: position.coords.latitude, lon: position.coords.longitude}})
       marker.setPosition(
           new google.maps.LatLng(
               position.coords.latitude,
               position.coords.longitude)
       );
    });
  }
}

if (Meteor.isClient) {
  Meteor.subscribe("userData");
  Meteor.subscribe("players");

  Template.map.rendered = function() {
    var layer = "toner";
    var myLatlng1 = new google.maps.LatLng(53.65914, 0.072050);
    var mapOptions = {
      zoom: 8,
      mapTypeId: layer,
      mapTypeControlOptions: {
        mapTypeIds: [layer]
      },
      disableDefaultUI: true
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
    var markers;
    if (!this.handle) {
      this.handle = Deps.autorun(function () {
        console.log("called")
        Players.find({}).forEach(function(p){
          if(markers[p.username] && p.lat) {
            markers[p.username][marker].setPosition(p.lat, p.long)
            markers[p.username][updated] = true;
          } else if (p.lat) {
            markers[p.username][updated] = true;
            markers[p.username][marker] = new google.maps.Marker({
              position: new google.maps.LatLng(p.lat, p.long),
              map: map,
              title: p.username
            })
          }

          for (var property in markers) {
            if (markers.hasOwnProperty(property)) {
              if (markers[property][updated]) {
                markers[property][updated] = false;
              } else {
                markers[property][marker].setMap(null)
                delete markers[property]
              }
            }
          }
        })
      })
    }
  }

    Template.map.destroyed = function () {
      this.handle && this.handle.stop();
    };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0)
      Players.insert({name: "test"});
  });

  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find(
        {_id: this.userId},
        {fields: {lat: 1, lon: 1}}
      );
    } else {
      this.ready();
    }
  });

  Meteor.publish("players", function () {
    return Meteor.users.find({"status.online": true}, {fields: {lat: 1, lon: 1}});
  });
}
