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
    $(window).resize(this.onResize.bind(this));
  },

  onResize: function() {
    var window_height = $(window).height();
    var original_height = this.$el.height();
    var max_height = window_height - 90;
    if (original_height > max_height) this.$el.height(max_height);
    $('.lionbars').lionbars();
  },

  render: function(events) {
    this.$el.html(this.template(events));
    this.onResize();
  }

});