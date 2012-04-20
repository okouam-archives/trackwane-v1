Trackwane.Controllers.AccountController = Trackwane.Controllers.Base.extend({

  events: {
    "click .accept": "onSave"
  },

  onSave: function() {
    var attributes = this.formAttributes();
    var errors = this.validate(attributes);
    if (errors) {
      this.showErrors(errors);
    } else {
      $.ajax({
        url: "/account",
        type: "POST",
        data: attributes,
        success: function() {
          this.showSuccess();
        },
        error: function(xhr, status, errors) {
          this.showErrors(errors);
        }
      });
    }
  },

  showErrors: function(errors) {
    var alert = this.$el.find(".alert");
    alert.addClass(".alert-error");
    alert.removeClass(".alert-success");
    alert.html(errors);
  },

  showSuccess: function() {
    var alert = this.$el.find(".alert");
    alert.addClass(".alert-success");
    alert.removeClass(".alert-error");
    alert.html("<p>Your account was successfully updated.</p>");
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  }
});

