App.Views.Alerts.Editor = App.Views.Base.extend({

  events: {
    "click .create": "onCreate",
    "click .save": "onSave",
    "click .cancel": "onCancel"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onCreate: function() {
    var callback = {
      submitHandler: function() {
        var attributes = this.formAttributes();
        this.pubsub.trigger("alert:created", attributes)
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(this.validation_rules, callback));
  },

  onCancel: function() {
    this.close();
  },

  onSave: function() {
    var callback = {
      submitHandler: function() {
        var attributes = this.formAttributes();
        this.pubsub.trigger("alert:saved", attributes)
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
    var selected_alert = $("#alert_alertable_id option:selected");
    attributes.alertable_type = selected_alert.data("type");
    attributes.alertable_id = selected_alert.val();
    attributes.destination = $("#alert_destination").val();
    return attributes;
  },

  prepareTemplates: function() {
    var source = $("#editor-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(view_model) {
    console.debug(view_model);
    this.$el.html(this.template(view_model));
    this.$el.show();
  }

});