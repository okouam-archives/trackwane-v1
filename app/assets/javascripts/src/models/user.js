App.Models.User = Backbone.Model.extend({

  urlRoot: "/users"

}, {

  validation_rules: {
    debug: true,
    rules: {
      login: {
        required: true,
        minlength: "3"
      },
      email: {
        required: true,
        minlength: "5",
        email: true
      },
      password: {
        required: true,
        minlength: "3"
      },
      password_confirmation: {
        required: true,
        minlength: 3
      }
    },
    messages: {
      login: {
        required: "Please provide a login",
        minLength: "The login must be a least {0} characters long"
      },
      email: {
        required: "Please provide an email",
        minlength: "Please enter a valid email format"
      },
      password: {
        required: "Please provide a password",
        minlength: "The password must be a least {0} characters long"
      },
      password_confirmation: {
        required: "Please provide a password confirmation",
        minlength: "The password must be a least {0} characters long"
      }
    }
  }

});