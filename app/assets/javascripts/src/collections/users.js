App.Collections.Users = Backbone.Collection.extend({

  model: App.Models.User,

  url: "/users",

  parse: function(response) {
    return response.results;
  }

});