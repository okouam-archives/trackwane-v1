App.Collections.Reports = Backbone.Collection.extend({

  model: App.Models.Report,

  url: "/reports",

  parse: function(response) {
    return response.results;
  }

});