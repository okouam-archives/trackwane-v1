App.Views.Devices.Listing = App.Views.Base.extend({

  events: {
    "click tr" : "onDeviceSelect",
    "click button.save": "onDeviceSave",
    "click button.delete": "onDeviceDelete",
    "click button.create": "onDeviceCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onDeviceSave: function() {
    this.pubsub.trigger("device:saved");
  },

  onDeviceDelete: function() {
    this.pubsub.trigger("device:deleted");
  },

  onDeviceSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("device:selected", id);
  },

  onDeviceCreate: function() {
    this.pubsub.trigger("device:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.$el.html(this.template(users));
    this.$el.show();
  }

});