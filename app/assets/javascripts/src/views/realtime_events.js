App.Views.RealtimeEvents = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.pubsub.on("events:received", this.render.bind(this));
    var source = $("#realtime-device-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(events) {
    this.events = events;
    if (!this.container) {
      this.container = $("<div class='map-listing'><div>").appendTo(this.$el);
      this.container.on('click', 'a', function(evt) {
        this.pubsub.trigger("event:selected", $(evt.currentTarget).data("id"));
      }.bind(this));
    }
    this.container.html(this.template(events));
  }

});