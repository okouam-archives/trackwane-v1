class Trackwane.Models.Schedule extends Backbone.Model

  @validation_rules:
    rules:
      "schedule[format]":
        required: true
        minlength: "3"
      "schedule[email]":
        required: true,
        minlength: "5",
        email: true
    messages:
      "schedule[format]":
        required: "Please provide a format"
        minLength: "The format must be a least {0} characters long"
      "schedule[email]":
        required: "Please provide an email"
        minlength: "Please enter a valid email format"
