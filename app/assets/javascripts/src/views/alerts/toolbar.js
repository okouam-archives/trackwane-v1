App.Views.Alerts.Toolbar = App.Views.Base.extend({

  events: {
    "click .button": "onCreateAlert"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreateAlert: function() {
    this.pubsub.trigger("alert:creating")
  }

});