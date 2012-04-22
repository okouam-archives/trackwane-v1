class Trackwane.Models.GeofenceAlarm extends Backbone.Model

  urlRoot: "/geofence_alarms"

  @validation_rules:
    debug: true
    rules:
      "geofence_alarm[name]":
        required: true
        minlength: "3"
    messages:
      "geofence_alarm[name]":
        required: $.t("validation_alarm.name_required")
        minlength: $.t("validation_alarm.name_minlength")

