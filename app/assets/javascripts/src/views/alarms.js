App.Views.Alarms = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    this.pubsub.on("alarms:received", this.render.bind(this));
  },

  render: function(events) {
  }

});