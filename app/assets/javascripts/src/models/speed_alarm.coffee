class Trackwane.Models.SpeedAlarm extends Backbone.Model

  urlRoot: "/speed_alarms"

  @validation_rules:
    rules:
      "speed_alarm[name]":
        required: true,
        minlength: "3"
      "speed_alarm[speed]":
        required: true,
        digits: true
    messages:
      "speed_alarm[name]":
        required:  $.t("validation_alarm.name_required")
        minlength: $.t("validation_speed_alarm.name_minlength")
      "speed_alarm[speed]":
        required:  $.t("validation_alarm.speed_required")
        digits:    $.t("validation_speed_alarm.speed_digits")
