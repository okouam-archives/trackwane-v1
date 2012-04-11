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

}, {
  validation_rules: {
    debug: true,
    rules: {
      "place[name]": {
        required: true,
        minlength: "3"
      },
      "place[category]": {
        required: true,
        minlength: "3"
      }
    },
    messages: {
      "place[name]": {
        required: "Please provide a place name",
        minLength: "The place name must be a least {0} characters long"
      },
      "place[category]": {
        required: "Please provide a category name",
        minlength: "The category name must be a least {0} characters long"
      }
    }
  }
});