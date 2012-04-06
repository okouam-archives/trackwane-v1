App.Views.Historical.Events = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#events-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(events) {
    this.events = events;
    this.$el.html(this.template(events));
  }

});