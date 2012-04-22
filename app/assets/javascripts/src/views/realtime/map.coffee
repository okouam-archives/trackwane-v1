class Trackwane.Views.Realtime.Map extends Backbone.View

  destination_lookup: {}

  initialize: (options) ->
    @pubsub = options.pubsub
    @places = new Trackwane.Collections.Places()
    @geofences = new Trackwane.Collections.Geofences()
    @animator = new Trackwane.Services.Animator(@removeDestination.bind(this))
    @animator.start(400)
    @mapper = new Trackwane.Services.Mapper()

  center: (event_id) ->
    feature = @device_layer.getFeatureById(event_id)
    @map.panTo feature.toLonLat()

  hideGeofences:  ->
    @geofence_layer.destroyFeatures()

  showGeofences: (geofences) ->
    features = @mapper.toGeofenceFeatures(geofences)
    @geofence_layer.addFeatures(features)

  hidePlaces: ->
    @place_layer.destroyFeatures()

  showPlaces: (places) ->
    if places && places.size() > 0
      features = @mapper.toPlaceFeatures(places);
      @place_layer.addFeatures(features);

  removeDestination: (device_id) ->
    feature = @destination_lookup[device_id]
    throw new Error("Unable to locate destination feature for device #{device_id}.") unless feature
    @device_layer.destroyFeatures([feature]);

  show: (events) ->
    events.each((event) => @createFeature(event)) if events and events.size() > 0

  showEvent: (event_data) ->
    numPoints = 10;
    path = @moveFeature(event_data, numPoints);
    if path
      feature = @device_layer.getFeatureBy("device_id", event_data.device_id)
      feature.followPath(@animator, path)

  moveFeature: (event_data, numPoints) ->
    feature = @device_layer.getFeatureBy("device_id", event_data.device_id)
    target = @mapper.toDestinationFeature(event_data)
    route = new Trackwane.Route(feature, target)
    if route
      console.debug "Changing rotation from #{feature.style.rotation} to #{route.getAngle()}." if console
      feature.rotate(route.getAngle())
      @destination_lookup[event_data.device_id] = target
      @device_layer.addFeatures([target])
    route.getPoints(numPoints)

  createFeature: (event)  ->
    feature = @mapper.toRealtimeFeature(event)
    @device_layer.addFeatures([feature])

  render: (extent, callback) ->
    @$el.empty()
    cartography = new Trackwane.Services.Cartography()
    @map = cartography.createMap(@el, callback)
    @device_layer = cartography.createLayer("devices")
    @geofence_layer = cartography.createLayer("geofences")
    @place_layer = cartography.createLayer("places")
    bounds = OpenLayers.Bounds.fromExtent(extent);
    @map.zoomToExtent(bounds)
