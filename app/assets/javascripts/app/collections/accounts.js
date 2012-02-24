$.App.Collections.Accounts = Backbone.Collection.extend({
  url: "/accounts",
  model: $.App.Models.Account,
  parse: function(response) {
    return response.results;
  }
});