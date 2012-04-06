App.Views.AlarmMap = App.Views.Base.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreated: function() {
    this.geofence_drawing_tool.deactivate();
  },

  stopEditing: function() {
    this.cancelEdit();
  },

  showAlarms: function(alarms) {
    if (!this.layer) {
      var cartography = new App.Services.Cartography(this.map);
      this.layer = cartography.createLayer("coordinates");
    }
    var format = new OpenLayers.Format.WKT();
    var features = [];
    _.each(alarms.models, function(alarm) {
      var coordinates = alarm.get("coordinates");
      if (coordinates) {
        var feature = format.read(coordinates);
        features.push(feature);
      }
    });
    this.layer.addFeatures(features);
  },

  show: function(name, coordinates) {
    if (!this.layer) {
      var cartography = new App.Services.Cartography(this.map);
      this.layer = cartography.createLayer("coordinates");
    }
    var format = new OpenLayers.Format.WKT();
    var feature = format.read(coordinates);
    this.layer.addFeatures([feature]);
  },

  clear: function() {
    if (this.layer) this.layer.destroyFeatures();
  },

  startEditing: function() {
    if (!this.geofence_drawing_tool)
      this.geofence_drawing_tool = new App.Services.GeofenceDrawingTool(this.map);
    this.geofence_drawing_tool.activate();
  },

  getCoordinates: function() {
    return this.geofence_drawing_tool.getCoordinates();
  },

  cancelEdit: function() {
    if (this.geofence_drawing_tool) this.geofence_drawing_tool.deactivate();
    if (this.layer) this.layer.destroyFeatures();
  },

  render: function() {
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.map.zoomTo(1);
  }

});