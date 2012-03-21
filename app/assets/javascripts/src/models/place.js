App.Models.Place = Backbone.Model.extend({

  urlRoot: "/places",

  getCoordinates: function() {
    var cartography = new App.Services.Cartography();
    var lonlat = new OpenLayers.LonLat(this.get("longitude"), this.get("latitude"));
    return cartography.projectForGoogleMaps(lonlat);
  },

  setCoordinates: function(lonlat) {
    this.set("longitude", lonlat.lon);
    this.set("latitude", lonlat.lat);
  }

});