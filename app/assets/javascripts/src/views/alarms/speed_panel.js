App.Views.Alarms.SpeedPanel = App.Views.Base.extend({

  events: {
    "click .cancel": "onCancel",
    "click .accept": "onAccept"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#speed-alarm-wizard-template").html();
    this.template = Handlebars.compile(source);
  },

  onCancel: function() {
    this.pubsub.trigger("speed:closing")
  },

  render: function(offset) {
    this.$el.html(this.template());
    if (offset) {
      this.$el.css("top", offset - 200);
    }
  },

  close: function() {
    this.$el.empty();
  },

  onAccept: function() {
    var name = $("input[name='speed_alarm[name]']").val();
    var speed = $('input[name="speed_alarm[speed]"]').val();
    var alarm = new App.Models.SpeedAlarm({speed: speed, name: name});
    this.pubsub.trigger("speed:created", alarm)
  }

});