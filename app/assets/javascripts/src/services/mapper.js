App.Services.Mapper = function() {};

_.extend(App.Services.Mapper.prototype, {

 featureFromEvent: function(event, cartography) {
  var lonlat = cartography.mercatorCoordinates(event.get("longitude"), event.get("latitude"));
  var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
  return new OpenLayers.Feature.Vector(point, event);
 },

 featuresFromPlaces: function(places, cartography) {

 },

 featuresFromGeofences: function(geofences, cartography) {

 }

});