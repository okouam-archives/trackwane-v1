App.Models.Alert = Backbone.Model.extend({

    urlRoot: "/alerts"

}, {
  validation_rules: {
    debug: true,
    rules: {
      "alert[destination]": {
        required: true,
        minlength: "3"
      }
    },
    messages: {
      "alert[destination]": {
        required: "Please provide a destination name",
        minLength: "The destination name must be a least {0} characters long"
      }
    }
  }
});