App.Collections.Schedules = Backbone.Collection.extend({

  model: App.Models.Schedule,

  url: "/schedules",

  parse: function(response) {
    return response.results;
  }

});