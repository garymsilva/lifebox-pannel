var map;
function myMap() {
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(-20.2821076, -40.3207234),
    zoom: 11
  }
  map = new google.maps.Map(mapCanvas, mapOptions);
}