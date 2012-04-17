class Trackwane.Models.Place extends Backbone.Model

  urlRoot: "/places",

  getCoordinates: ->
    cartography = new Trackwane.Services.Cartography()
    lonlat = new OpenLayers.LonLat(this.get("longitude"), this.get("latitude"))
    cartography.projectForGoogleMaps(lonlat)

  setCoordinates: (lonlat) ->
    this.set("longitude", lonlat.lon)
    this.set("latitude", lonlat.lat)

  @validation_rules:
    debug: true
    rules:
      "place[name]":
        required: true,
        minlength: "3"
      "place[category]":
        required: true,
        minlength: "3"
    messages:
      "place[name]":
        required: "Please provide a place name"
        minLength: "The place name must be a least {0} characters long"
      "place[category]":
        required: "Please provide a category name"
        minlength: "The category name must be a least {0} characters long"
