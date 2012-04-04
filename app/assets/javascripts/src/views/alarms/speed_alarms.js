App.Views.SpeedAlarms = Backbone.View.extend({

  events: {
    "click .remove": "onRemove",
    "click .select": "onSelect"
  },

  onRemove: function(evt) {
    if (confirm("Are you sure you want to delete this speed alarm?")) {
      var id = $(evt.currentTarget).data("id");
      this.pubsub.trigger("speed-alarm:deleted", id);
    }
  },

  onSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("speed-alarm:selected", id);
  },

  initialize: function(options) {
    var source = $("#speed-alarms-template").html();
    this.template = Handlebars.compile(source);
    this.pubsub = options.pubsub;
  },

  render: function(alarms) {
    this.$el.html(this.template(alarms));
    $(this.$el).lionbars();
  }

});