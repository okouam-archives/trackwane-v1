class Trackwane.Models.Event extends Backbone.Model

  getCoordinates: ->
    lonlat = new OpenLayers.LonLat(@get("longitude"), @get("latitude"))
    new Trackwane.Services.Cartography().projectForGoogleMaps(lonlat)
