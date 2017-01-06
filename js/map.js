function Map() {
}

Map.prototype.getShelter = function(lat, long) {
  var userLatLng = new google.maps.LatLng(lat, long);
  var myOptions = {
    zoom : 8,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
};


exports.mapModule = Map;
