App.Collections.Places = Backbone.Collection.extend({

  model: App.Models.Place,

  url: "/places",

  parse: function(response) {
    return response.results;
  }

});