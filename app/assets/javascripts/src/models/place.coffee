class Trackwane.Models.Place extends Backbone.Model

  urlRoot: "/places",

  getCoordinates: ->
    cartography = new Trackwane.Services.Cartography()
    lonlat = new OpenLayers.LonLat(this.get("longitude"), this.get("latitude"))
    cartography.projectForGoogleMaps(lonlat)

  setCoordinates: (longitude, latitude) ->
    this.set("longitude", longitude)
    this.set("latitude", latitude)

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
        required: $.t("validation_places.name_required")
        minlength: $.t("validation_places.name_minlength")
      "place[category]":
        required: $.t("validation_places.category_required")
        minlength: $.t("validation_places.category_minlength")
