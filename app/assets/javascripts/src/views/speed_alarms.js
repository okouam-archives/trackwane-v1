App.Views.SpeedAlarms = Backbone.View.extend({

  initialize: function(options) {
    var source = $("#speed-alarms-template").html();
    this.template = Handlebars.compile(source);
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    this.pubsub.on("speed_alarms:received", this.render.bind(this));
  },

  render: function(alarms) {
    this.alarms = alarms;
    if (!this.container) {
      this.container = $("<div class='map-listing speed-alarms'><div>").appendTo(this.$el);
    }
    this.container.html(this.template(alarms));
  }

});