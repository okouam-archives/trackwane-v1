App.Views.Alarms.SpeedPanel = App.Views.Base.extend({

  events: {
    "click .switcher a": "onToggle",
    "click .closelabel": "onClose",
    "click .next": "onAccept"
  },

  appEvents: {
    "geofence:creating:start": "onClose"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.handleApplicationEvents();
  },

  onClose: function() {
    this.close();
  },

  onAccept: function() {
    this.save();
  },

  onToggle: function() {
    if (!this.open) {
      this.pubsub.trigger("speed:creating:start");
      this.open = true;
      this.render();
    } else {
      this.close();
    }
  },

  render: function() {
    var source = $("#speed-alarm-wizard-template").html();
    var template = Handlebars.compile(source);
    this.$el.find(".form").html(template());
  },

  close: function() {
    this.$el.find(".form").empty();
    this.open = false;
  },

  save: function() {
    var name = $("input[name='speed_alarm[name]']").val();
    if (name == "") {
      alert("Please select a name for the speed alert.");
      return;
    }
    var speed = $('input[name="speed_alarm[speed]"]').val();
    if (speed == "") {
      alert("Please select a speed for the speed alert.");
      return;
    }
    var alarm = new App.Models.SpeedAlarm();
    alarm.save({name: name, speed: speed}, {
      success: function(model) {
        this.pubsub.trigger("speed-alarm:created", model);
        this.close();
      }.bind(this),
      error: function() {
        console.debug(error);
        this.close();
      }.bind(this)
    });
  }

});