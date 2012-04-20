class Trackwane.Models.Account extends Backbone.Model

  urlRoot: "/accounts"

  @validation_rules:
    rules:
      "account[name]":
        required: true
        minlength: "3"
      "account[email]":
        required: true,
        email: true
    messages:
      "account[name]":
        required:  $.t("validation.accounts.name.required")
        minlength: $.t("validation.accounts.name.min_length")
      "account[email]":
        required:  $.t("validation.email.required")
        email:     $.t("validation.email.bad_format")
