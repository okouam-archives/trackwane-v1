App.Collections.Alerts = Backbone.Collection.extend({

  model: App.Models.Alert,

  url: "/alerts",

  parse: function(response) {
    return response.results;
  }

});