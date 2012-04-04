App.Collections.Accounts = Backbone.Collection.extend({

  model: App.Models.Account,

  url: "/accounts",

  parse: function(response) {
    return response.results;
  }

});