App.Views.GeofenceAlarms = Backbone.View.extend({

  initialize: function(options) {
    var source = $("#geofence-alarms-template").html();
    this.template = Handlebars.compile(source);
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    this.pubsub.on("geofence_alarms:received", this.render.bind(this));
  },

  render: function(alarms) {
    this.alarms = alarms;
    if (!this.container) {
      this.container = $("<div class='geofence-alarms map-listing''><div>").appendTo(this.$el);
    }
    this.container.html(this.template(alarms));
  }

});