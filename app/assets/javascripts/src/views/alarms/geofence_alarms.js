App.Views.GeofenceAlarms = Backbone.View.extend({

  initialize: function(options) {
    var source = $("#geofence-alarms-template").html();
    this.template = Handlebars.compile(source);
    this.pubsub = options.pubsub;
  },

  render: function(alarms) {
    this.$el.html(this.template(alarms));
  }

});