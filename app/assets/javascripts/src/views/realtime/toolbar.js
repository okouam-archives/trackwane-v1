App.Views.Realtime.Toolbar = Backbone.View.extend({

  events: {
    "click .places": "onClickPlaces",
    "click .geofences": "onClickGeofenceAlarms"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.setElement(this.el);
  },

  onClickPlaces: function(evt) {
    $(evt.currentTarget).toggleClass("highlight");
    this.pubsub.trigger("places:toggle");
  },

  onClickGeofenceAlarms: function(evt) {
    $(evt.currentTarget).toggleClass("highlight");
    this.pubsub.trigger("geofence-alarms:toggle");
  }

});