App.Collections.Devices = Backbone.Collection.extend({

  model: App.Models.Device,

  url: "/devices",

  parse: function(response) {
    return response.results;
  }

});