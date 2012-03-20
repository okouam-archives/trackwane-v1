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
    var wizard = this.openWizard("#speed-alarm-wizard-template");
    wizard.find(".next").on('click', function() {
      this.saveSpeedAlarm();
    }.bind(this));
    wizard.find(".closelabel").on('click', function() {
      this.closeWizards();
    }.bind(this));
    this.wizards.speed.is_open = true;
  },

  allowGeofencePositioning: function() {
    if (!this.drawFeature) {
      var cartography = new App.Services.Cartography();
      cartography.map = this.map;
      this.draw_layer = cartography.createLayer("drawing_layer");
      this.map.addLayer(this.draw_layer);
      this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Polygon);
      this.drawFeature.events.on({
        featureadded: function() {
          this.drawFeature.deactivate();
          this.new_geofence = this.draw_layer.features[0].geometry;
        }.bind(this)
      });
      this.map.addControl(this.drawFeature);
    }
    this.drawFeature.activate();
  },

  saveGeofenceAlarm: function() {
    var name = $("input[name='geofence_alarm[name]']").val();
    var category = $("input[name='geofence_alarm[category]']").val();
    this.draw_layer.destroyFeatures();
    this.drawFeature.deactivate();
    var alarm = new App.Models.GeofenceAlarm();
    var format = new OpenLayers.Format.WKT();
    alarm.save({name: name, category: category, coordinates: format.extractGeometry(this.new_geofence)}, {
      success: function() {
        this.new_geofence = null;
        this.closeWizards();
      }.bind(this),
      error: function() {

      }.bind(this)
    });
  },

  saveSpeedAlarm: function() {
    var name = $("input[name='speed_alarm[name]']").val();
    if (name == "") {
      alert("Please select a name for the speed alert.");
      return;
    }
    var speed = $('input[name="speed_alarm[speed]"]').val();
    if (speed == "") {
      alert("Please select a speed for the speed alert.");
      return;
    }
    var alarm = new App.Models.SpeedAlarm();
    alarm.save({name: name, speed: speed}, {
      success: function() {
        this.closeWizards();
      }.bind(this),
      error: function() {

      }.bind(this)
    });
  },

  toggleGeofenceAlarmWizard: function() {
    if (this.wizards.any()) this.closeWizards();
    var wizard = this.openWizard("#geofence-alarm-wizard-template");
    wizard.find(".next").on('click', function() {
      this.saveGeofenceAlarm();
    }.bind(this));
    wizard.find(".closelabel").on('click', function() {
      this.closeWizards();
    }.bind(this));
    this.wizards.geofence.is_open = true;
    this.allowGeofencePositioning();
  },

  closeWizards: function() {
    $(".wizard").remove();
  },

  openWizard: function(template_id) {
    var source = $(template_id).html();
    var template = Handlebars.compile(source);
    return $(template()).appendTo($(this.el));
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