App.Views.RealtimeEvents = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.container = options.container;
    this.pubsub.on("events:received", this.render.bind(this));
  },

  render: function(events) {
    if (!this.container) this.container = $("<div id='realtime-devices-wrapper'><div>").appendTo(this.$el);
    var source = $("#realtime-device-template").html();
    var template = Handlebars.compile(source);
    this.container.html(template(events));
  }

});