App.Views.RealtimeEvents = Backbone.View.extend({

  events: {
    "click a": "onSelection"
  },

  onSelection: function(evt) {
    this.pubsub.trigger("event:selected", $(evt.currentTarget).data("id"));
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#realtime-device-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(events) {
    this.$el.html(this.template(events));
  }

});