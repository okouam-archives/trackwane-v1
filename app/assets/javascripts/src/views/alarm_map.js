App.Views.AlarmMap = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
  },

  wizards: {
    any: function() {
      return this.speed.is_open || this.geofence.is_open;
    },
    speed: {is_open: false},
    geofence: {is_open: false}
  },

  events: {
    "click .switcher.speed-alarms": "toggleSpeedAlarmWizard",
    "click .switcher.geofence-alarms": "toggleGeofenceAlarmWizard"
  },

  toggleSpeedAlarmWizard: function() {
    if (this.wizards.any()) this.closeWizards();
    this.openWizard("#speed-alarm-wizard-template");
    this.wizards.speed.is_open = true;
  },

  toggleGeofenceAlarmWizard: function() {
    if (this.wizards.any()) this.closeWizards();
    this.openWizard("#geofence-alarm-wizard-template");
    this.wizards.geofence.is_open = true;
  },

  closeWizards: function() {
    $(".wizard").remove();
  },

  center: function(div) {
    div.offset({top: (this.$el.height() / 2) - (div.height() / 2), left: (this.$el.width() / 2) - (div.width() / 2)});
  },

  openWizard: function(template_id) {
    var source = $(template_id).html();
    var template = Handlebars.compile(source);
    var wizard = $(template()).appendTo($(this.el));
    this.center(wizard);
  },

  render: function() {
    this.$el.empty();
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.map.zoomTo(1);
    this.renderSpeedAlarmsButton();
    this.renderGeofenceAlarmsButton();
    this.setElement(this.el);
  },

  renderSpeedAlarmsButton: function() {
    $(this.el).append("<div class='switcher speed-alarms'><a href='#'><img style='height: 20px' src='/assets/103-map.png'>New Speed Alarm</a></div>")
  },

  renderGeofenceAlarmsButton: function() {
    $(this.el).append("<div class='switcher geofence-alarms'><a href='#'><img style='height: 20px' src='/assets/103-map.png'>New Geofence Alarm</a></div>")
  }

});