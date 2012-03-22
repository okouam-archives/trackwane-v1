App.Views.Devices.Toolbar = App.Views.Base.extend({

  events: {
    "click .button": "onCreateDevice"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreateDevice: function() {
    this.pubsub.trigger("device:creating")
  }

});