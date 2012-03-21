App.Controllers.DevicesController = App.Controllers.Base.extend({

  initialize: function() {
    this.pubsub = _.extend({}, Backbone.Events);
  }

});

