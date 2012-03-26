App.Views.Alarms.SpeedPanel = App.Views.Base.extend({

  events: {
    "click .close": "onClose",
    "click button": "onSave"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#speed-alarm-wizard-template").html();
    this.template = Handlebars.compile(source);
  },

  onClose: function() {
    this.pubsub.trigger("speed:closing")
  },

  render: function() {
    this.$el.html(this.template());
  },

  close: function() {
    this.$el.empty();
  },

  onSave: function() {
    this.pubsub.trigger("speed:created")
  },

  save: function() {
    var name = $("input[name='speed_alarm[name]']").val();
    var speed = $('input[name="speed_alarm[speed]"]').val();
    var alarm = new App.Models.SpeedAlarm({speed: speed, name: name});
    if (alarm.isValid()) this.pubsub.trigger("speed:created", alarm);
    else alert("invalid model");
  }

});