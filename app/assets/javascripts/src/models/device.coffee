class Trackwane.Models.Device extends Backbone.Model

  urlRoot: "/devices"

  @validation_rules:
    rules:
      display_name:
        required: true
        minlength: "3"
      imei_number:
        required: true
        minlength: 5
        digits: true
    messages:
      display_name:
        required:  $.t("validation_devices.display_name_required")
        minlength: $.t("validation_devices.display_name_minlength")
      imei_number:
        required:  $.t("validation_devices.imei_number_required")
        minlength: $.t("validation_devices.imei_number_minlength")
        digits:    $.t("validation_devices.imei_number_digits")

