Trackwane.Views.Realtime.Events = Backbone.View.extend({

  events: {
    "click a": "onSelection"
  },

  initial_render: true,

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
    var max_height = window_height - 100;
    if (original_height > max_height) this.$el.height(max_height);
    this.$el.lionbars();
  },

  update: function(events) {
    events.each(function(event) {
      var attributes = event.attributes;
      var entry = this.getDeviceTile(attributes.device_id);
      var address = entry.find(".address");
      if (address.text() != attributes.address)
        address.html(attributes.address);
      //entry.find(".place").html("place");
    }.bind(this))
  },

  getDeviceTile: function(id) {
    return this.$el.find("tr[data='" + id + "']");
  },

  render: function(events) {
    if (this.initial_render) {
      this.$el.html(this.template(events));
      this.onResize();
      this.initial_render = false;
    } else {
      this.update(events)
    }
  }

});