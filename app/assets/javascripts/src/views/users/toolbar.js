App.Views.Users.Toolbar = App.Views.Base.extend({

  events: {
    "click .button": "onCreateUser"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreateUser: function() {
    this.pubsub.trigger("user:creating")
  }

});