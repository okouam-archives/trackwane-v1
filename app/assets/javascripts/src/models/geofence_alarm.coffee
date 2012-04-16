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
        required: "Please provide an alarm name"
        minLength: "The alarm name must be a least {0} characters long"
