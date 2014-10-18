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
    }


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


