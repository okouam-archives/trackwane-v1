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
    var name = $(".wizard .name").val();
    var alarm_type = $(".wizard .alarm_type").val();
    this.draw_layer.destroyFeatures();
    this.drawFeature.deactivate();
    var alarm = new App.Models.GeofenceAlarm();
    alarm.save({name: name, type: alarm_type, coordinates: this.new_geofence}, {
      success: function() {
        this.new_geofence = null;
        this.closeWizards();
      },
      error: function() {

      }
    });
  },

  saveSpeedAlarm: function() {
    var name = $(".wizard .name").val();
    var speed = $(".wizard .speed").val();
    var alarm = new App.Models.SpeedAlarm();
    alarm.save({name: name, speed: speed}, {
      success: function() {
        this.closeWizards();
      },
      error: function() {

      }
    });
  },

  toggleGeofenceAlarmWizard: function() {
    if (this.wizards.any()) this.closeWizards();
    var wizard = this.openWizard("#geofence-alarm-wizard-template");
    wizard.find(".next").on('click', function() {
      this.saveGeofenceAlarm();
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