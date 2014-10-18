Players = new Mongo.Collection("players");

function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
       Players.update(Session.get("player")._id, {$set: {lat: position.coords.latitude, lon: position.coords.longitude}})
    });
  }
}

if (Meteor.isClient) {
  while(!Session.get("player")) {
      Session.set("player", Players.findOne({name: "test"}))
  }

  Meteor.setInterval(getLocation, 1000)
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0)
      Players.insert({name: "test"});
  });
}
