App.Views.Alarms.GeofencePanel = App.Views.Base.extend({

  events: {
    "click .switcher a": "onToggle",
    "click .closelabel": "onClose",
    "click .next": "onAccept"
  },

  appEvents: {
    "speed:creating:start": "onClose",
    "geofence:selected": "onGeofenceSelected"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.handleApplicationEvents();
  },

  onClose: function() {
    this.pubsub.trigger("geofence:creating:cancel");
    this.close();
  },

  onAccept: function() {
    this.save();
  },

  onGeofenceSelected: function(geofence) {
    this.geofence = geofence;
  },

  render: function() {
    var source = $("#geofence-alarm-wizard-template").html();
    var template = Handlebars.compile(source);
    this.$el.find(".form").html(template());
  },

  onToggle: function() {
    if (!this.open) {
      this.pubsub.trigger("geofence:creating:start");
      this.render();
      this.open = true;
    } else {
      this.pubsub.trigger("geofence:creating:cancel");
      this.close();
    }
  },

  close: function() {
    this.$el.find(".form").empty();
    this.open = false;
  },

  save: function() {
    var name = $("input[name='geofence_alarm[name]']").val();
    var category = $("select[name='geofence_alarm[category]']").val();
    var alarm = new App.Models.GeofenceAlarm();
    alarm.save({name: name, category: category, coordinates: this.geofence}, {
      success: function(model) {
        this.pubsub.trigger("geofence-alarm:created", model);
        this.close();
      }.bind(this),
      error: function(error) {
        console.debug(error);
        this.close();
      }.bind(this)
    });
  }

});