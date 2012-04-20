class Trackwane.Models.Schedule extends Backbone.Model

  urlRoot: "/schedules"

  @validation_rules:
    rules:
      "schedule[format]":
        required: true
        minlength: "3"
      "schedule[email]":
        required: true,
        email: true
    messages:
      "schedule[format]":
        required:  $.t("validation_schedules.format_required")
        minlength: $.t("validation_schedules.format_minlength")
      "schedule[email]":
        required:  $.t("validation_schedules.email_required")
        email:     $.t("validation_schedules.email_format")
