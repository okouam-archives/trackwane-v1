class Trackwane.Views.Realtime.Map extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Places
  @include Trackwane.Core.Traits.Alarms

  initialize: (options) ->
    super(options)
    @places = new Trackwane.Collections.Places()
    @geofences = new Trackwane.Collections.Geofences()
    @animator = new Trackwane.Core.Helpers.Animator()
    @animator.start(400)
    @mapper = new Trackwane.Core.Helpers.Mapper()

  showFeature: (model) ->
    switch model.constructor.name
      when "Place" then @showOnLayer("places", model)
      when "Device" then @showOnLayer("trackers", model)
      when "SpeedAlarm" then @showOnLayer("alarms", model)
      when "GeofenceAlarm" then @showOnLayer("alarms", model)
      else throw "Unknown feature type"

  hideFeature: (model) ->
    switch model.constructor.name
      when "Place" then @hide("places", model.id)
      when "Device" then @hide("trackers", model.id)
      when "SpeedAlarm" then @hide("alarms", model.id)
      when "GeofenceAlarm" then @hide("alarms", model.id)
      else throw "Unknown feature type"

  showOnLayer: (layer_name, model) ->
    @map.getLayersByName(layer_name)[0].addFeatures([model.toFeature()])

  hide: (layer_name, id) ->
    console.debug(id)
    layer = @map.getLayersByName(layer_name)[0]
    console.debug(layer)
    feature = layer.getFeaturesByAttribute("id", id)
    console.debug(feature)
    layer.destroyFeatures(feature)

  centerFeature: (model) ->
    feature = @device_layer.getFeatureById(event_id)
    @map.panTo feature.toLonLat() if feature

  show: (events) ->
    if events.any()
      features = events.map((event) => @mapper.toRealtimeFeature(event))
      @map.getLayerByName("trackers").addFeatures(features)

  showEvent: (event_data) ->
    numPoints = 10;
    path = @moveFeature(event_data, numPoints);
    if path
      feature = @device_layer.getFeatureBy("device_id", event_data.device_id)
      feature.followPath(@animator, path)

  moveFeature: (event_data, numPoints) ->
    feature = @device_layer.getFeatureBy("device_id", event_data.device_id)
    if feature
      target = @mapper.toDestinationFeature(event_data)
      route = new Trackwane.Route(feature, target)
      feature.rotate(route.getAngle()) if route
      route.getPoints(numPoints)
    else
      undefined

  render: (extent, callback) ->
    @$el.empty()
    @map = Trackwane.Core.Framework.RealtimeMap.create(@el, callback)
    if extent
      extent = OpenLayers.Bounds.fromExtent(extent)
    else
      extent = new OpenLayers.Bounds(-1928659.0974232, 202405.25087096,	 1202201.5807018, 1647982.329599);
    @map.zoomToExtent(extent);

