App.Collections.Accounts = Backbone.Collection.extend({

  model: App.Models.Account,

  url: "/account",

  parse: function(response) {
    return response.results;
  }

});