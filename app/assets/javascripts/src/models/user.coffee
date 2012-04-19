class Trackwane.Models.User extends Backbone.Model

  urlRoot: "/users"

  @validation_rules:
    debug: true
    rules:
      login:
        required: true
        minlength: "3"
      email:
        required: true
        email: true
      password:
        required: true
        minlength: "5"
    messages:
      login:
        required:  $.t("validation_users.login_required")
        minlength: $.t("validation_users.login_minlength")
      email:
        required:  $.t("validation_users.email_required")
        email:     $.t("validation_users.email_bad_format")
      password:
        required:  $.t("validation_users.password_required")
        minlength: $.t("validation_users.password_minlength")

