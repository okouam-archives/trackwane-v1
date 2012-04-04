App.Views.Reports.NewReport = Backbone.View.extend({

  events: {
    "click .cancel": "onCancel",
    "click .accept": "onAccept"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#new-report-template").html();
    this.template = Handlebars.compile(source);
  },

  onAccept: function() {
    var name = this.$el.find("#report_name").val();
    if (!name) {
      alert("Please give your new report a name");
      return false;
    }
    this.pubsub.trigger("new-report:accept", this.parameters, this.devices, name)
  },

  onCancel: function() {
    this.pubsub.trigger("new-report:cancel");
    return false;
  },

  render: function(parameters, devices) {
    this.parameters = parameters;
    this.devices = devices;
    this.$el.show();
    this.$el.html(this.template({parameters: parameters, devices: devices}));
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  }

});