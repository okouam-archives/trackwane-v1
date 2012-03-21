App.Controllers.UsersController = App.Controllers.Base.extend({

  initialize: function() {
    this.pubsub = _.extend({}, Backbone.Events);
  }

});


