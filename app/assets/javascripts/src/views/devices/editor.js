Trackwane.Views.Devices.Editor = Trackwane.Views.Base.extend({

  validation_rules: {
    debug: true,
    rules: {
      display_name: {
        required: true,
        minlength: "3"
      },
      imei_number: {
        required: true,
        minlength: 5,
        digits: true
      }
    },
    messages: {
      display_name: {
        required: "Please provide a name for the device",
        minLength: "The name of a device must be a least {0} characters long"
      },
      imei_number: {
        required: "Please provide a IMEI number for the device",
        minlength: "The IMEI number of a device must be at least {0} digits long",
        digits: "The IMEI number must be only digits"
      }
    }
  },

  events: {
    "click .create": "onCreate",
    "click .cancel": "onClose",
    "click .save": "onSave"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onCreate: function() {
    var callback = {
      submitHandler: function() {
        var attributes = this.formAttributes();
        this.pubsub.trigger("device:created", attributes)
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(this.validation_rules, callback));
  },

  onDelete: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("device:deleted", attributes)
  },

  onClose: function() {
    this.close();
  },

  onSave: function() {
    var callback = {
      submitHandler: function() {
      var attributes = this.formAttributes();
      this.pubsub.trigger("device:saved", attributes)
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(this.validation_rules, callback));
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  },

  prepareTemplates: function() {
    var source = $("#editor-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(place) {
    this.$el.html(this.template(place));
    this.$el.show();
  }

});