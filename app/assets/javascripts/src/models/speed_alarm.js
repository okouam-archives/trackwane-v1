App.Models.SpeedAlarm = Backbone.Model.extend({

  urlRoot: "/speed_alarms"

}, {

  validation_rules: {
    debug: true,
    rules: {
      "speed_alarm[name]": {
        required: true,
        minlength: "3"
      },
      "speed_alarm[speed]": {
        required: true,
        digit: true
      }
    },
    messages: {
      "speed_alarm[name]": {
        required: "Please provide an speed name",
        minLength: "The speed name must be a least {0} characters long"
      },
      "speed_alarm[speed]": {
        required: "Please provide a speed value",
        minLength: "The speed value must be a least {0} characters long"
      }
    }
  }

});