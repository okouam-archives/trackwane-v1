class Trackwane.Views.AlarmMap extends Trackwane.Views.Base

  initialize: (options) ->
    @pubsub = options.pubsub

  onCreated: ->
    @geofence_drawing_tool.deactivate()

  stopEditing: ->
    @cancelEdit()

  showAlarms: (alarms) ->
    @layer ?= new Trackwane.Services.Cartography(@map).createLayer("coordinates");
    mapper = new Trackwane.Services.Mapper();
    features = (@createFeature(mapper, alarm) for alarm in alarms.models)
    features = (feature for feature in features when feature)
    @layer.addFeatures(features)

  createFeature: (mapper, alarm) ->
    name = alarm.get("name")
    coordinates = alarm.get("coordinates")
    mapper.toGeofenceFeature(name, coordinates) if coordinates and name

  show: (name, coordinates) ->
    @layer ?= new Trackwane.Services.Cartography(@map).createLayer("coordinates")
    feature = new Trackwane.Services.Mapper().toGeofenceFeature(name, coordinates)
    @layer.addFeatures([feature])

  clear: ->
    @layer.destroyFeatures() if @layer

  startEditing: ->
    @geofence_drawing_tool ?= new Trackwane.Services.GeofenceDrawingTool(@map)
    @geofence_drawing_tool.activate()

  getCoordinates: ->
    @geofence_drawing_tool.getCoordinates()

  cancelEdit: ->
    @geofence_drawing_tool.deactivate() if @geofence_drawing_tool
    @layer.destroyFeatures() if @layer

  render: ->
    @map = new Trackwane.Services.Cartography().createMap(this.el)
    @map.zoomTo(1)
