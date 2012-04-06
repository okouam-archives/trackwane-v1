App.Models.Event = Backbone.Model.extend({

  getCoordinates: function() {
    var cartography = new App.Services.Cartography();
    var lonlat = new OpenLayers.LonLat(this.get("longitude"), this.get("latitude"));
    return cartography.projectForGoogleMaps(lonlat);
  }

});