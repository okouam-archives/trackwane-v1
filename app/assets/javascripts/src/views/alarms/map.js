App.Views.AlarmMap = App.Views.Base.extend({

  appEvents: {
    "geofence:creating:start": "onStartEdit",
    "geofence:creating:cancel": "onCancelEdit",
    "speed:creating:start": "onCancelEdit",
    "geofence-alarm:created": "cancelEdit"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.handleApplicationEvents();
  },

  onCreated: function() {
    this.geofence_drawing_tool.deactivate();
  },

  onCancelEdit: function() {
    this.cancelEdit();
  },

  onStartEdit: function() {
    if (!this.geofence_drawing_tool)
      this.geofence_drawing_tool = new App.Services.GeofenceDrawingTool(this.map, this.pubsub);
    this.geofence_drawing_tool.activate();
  },

  cancelEdit: function() {
    if (this.geofence_drawing_tool) this.geofence_drawing_tool.deactivate();
  },

  render: function() {
    var cartography = new App.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.map.zoomTo(1);
  }

});