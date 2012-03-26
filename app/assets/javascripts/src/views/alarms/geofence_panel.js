App.Views.Alarms.GeofencePanel = App.Views.Base.extend({

  events: {
    "click .close": "onClose",
    "click button": "onSave"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#geofence-alarm-wizard-template").html();
    this.template = Handlebars.compile(source);
  },

  onSave: function() {
    var name = $("input[name='geofence_alarm[name]']").val();
    var category = $("select[name='geofence_alarm[category]']").val();
    var alarm = new App.Models.GeofenceAlarm({name: name, category: category});
    this.pubsub.trigger("geofence:created", alarm)
  },

  onClose: function() {
    this.pubsub.trigger("geofence:closing")
  },

  select: function(geofence) {
    this.geofence = geofence;
  },

  render: function() {
    this.$el.html(this.template());
  },

  close: function() {
    this.$el.empty();
  }
});