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
        required: "Please provide a name for the device"
        minLength: "The name of a device must be a least {0} characters long"
      imei_number:
        required: "Please provide a IMEI number for the device"
        minlength: "The IMEI number of a device must be at least {0} digits long"
        digits: "The IMEI number must be only digits"

