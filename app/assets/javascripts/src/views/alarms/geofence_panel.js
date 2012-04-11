App.Views.Alarms.GeofencePanel = App.Views.Base.extend({

  events: {
    "click .cancel": "onCancel",
    "click .accept": "onAccept"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#geofence-alarm-wizard-template").html();
    this.template = Handlebars.compile(source);
  },

  onAccept: function() {
    var callback = {
      submitHandler: function() {
        var name = $("input[name='geofence_alarm[name]']").val();
        var alarm = new App.Models.GeofenceAlarm({name: name});
        this.pubsub.trigger("geofence:created", alarm)
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(App.Models.GeofenceAlarm.validation_rules, callback));
  },

  onCancel: function() {
    this.pubsub.trigger("geofence:closing")
  },

  select: function(geofence) {
    this.geofence = geofence;
  },

  render: function(offset) {
    this.$el.html(this.template());
    if (offset) {
      this.$el.css("top", offset - 250);
    }
  },

  close: function() {
    this.$el.empty();
  }
});