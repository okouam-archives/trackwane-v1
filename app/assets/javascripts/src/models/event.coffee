class Trackwane.Models.Event extends Backbone.Model

  getCoordinates: ->
    lonlat = new OpenLayers.LonLat(@get("longitude"), @get("latitude"))
    source = new OpenLayers.Projection("EPSG:4326");
    dest = new OpenLayers.Projection("EPSG:900913");
    return lonlat.transform(source, dest);
