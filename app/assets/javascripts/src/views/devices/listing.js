App.Views.Devices.Listing = App.Views.Base.extend({

  events: {
    "click tr" : "onDeviceSelect",
    "click button.save": "onDeviceSave",
    "click a.remove": "onDeviceDelete",
    "click button.create": "onDeviceCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
    $(window).resize(this.onResize.bind(this));
  },

  resize: function() {
    var window_height = $(window).height();
    var original_height = this.$el.height();
    var max_height = window_height - 90;
    if (original_height > max_height) this.$el.height(max_height);
    else this.$el.height("auto");
    $('.lionbars').lionbars();
  },

  onResize: function() {
    this.render(this.devices);
  },

  onDeviceSave: function() {
    this.pubsub.trigger("device:saved");
  },

  onDeviceDelete: function(evt) {
    if (confirm("Are you sure you want to delete this device?")) {
      var id = $(evt.currentTarget).data("id");
      this.pubsub.trigger("device:deleted", id);
    }
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

  render: function(devices) {
    this.devices = devices;
    this.$el.html(this.template(devices));
    this.$el.show();
    this.resize();
  }

});