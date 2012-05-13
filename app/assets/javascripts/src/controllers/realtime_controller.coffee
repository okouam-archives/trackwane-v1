class Trackwane.Controllers.RealtimeController extends Trackwane.Core.Framework.Controller

  Scope: Trackwane.Views.Realtime

  appEvents:
    "app:polygon-builder:activate": "onActivatePolygonBuilder"
    "app:polygon-builder:clear": "onClearPolygonBuilder"
    "app:point-builder:activate": "onActivatePointBuilder"
    "app:point-builder:clear": "onClearPointBuilder"
    "feature:show": "onFeatureShow"
    "feature:hide": "onFeatureHide"
    "feature:select": "onFeatureSelect"
    "app:reset": "onAppReset"

  initialize: (options) ->
    super(options)
    @toolbar = new @Scope.Toolbar({el: "#canvas .listing.toolbar", pubsub: @pubsub})
    @feature_panel = new @Scope.FeaturePanel({el: "#feature-panel", pubsub: @pubsub, places: options.places, speed_alarms: options.speed_alarms, geofence_alarms: options.geofence_alarms})
    @map = new @Scope.Map({el: "#map", pubsub: @pubsub})
    @tracker_panel = new @Scope.Trackers.Panel({el: "#tracker-panel", pubsub: @pubsub})
    @render(options)

  render: (options) ->
    @feature_panel.render(options)
    trackers = new Trackwane.Collections.Devices(options.devices)
    events = new Trackwane.Collections.RealtimeEvents(options.events)
    @map.render(options.extent, (() => @showInitialPositions(trackers, events)))

  onFeatureSelect: (model) ->
    @map.centerFeature(model)

  onFeatureShow: (model) ->
    @map.showFeature(model)

  onFeatureHide: (model) ->
    @map.hideFeature(model)

  onAppReset: () ->
    @map.reset()

  onClearPointBuilder: () ->
    @map.clearPointBuilder()

  onClearPolygonBuilder: () ->
    @map.clearPolygonBuilder()

  onActivatePolygonBuilder: () ->
    @map.activatePolygonBuilder()

  onActivatePointBuilder: () ->
    @map.activatePointBuilder()

  setupRealtimeTracking: (trackers) ->
    pusher = new Pusher('fee5deb878965544bd90')
    trackers.each (tracker) =>
      channel = pusher.subscribe("#{tracker.get("account_id")}-#{tracker.get("device_id")}")
      channel.bind 'event-received', ((data) =>
        event = new Trackwane.Models.Event(data)
        @map.showEvent(event))

  showInitialPositions: (trackers, events) ->
    @tracker_panel.render(trackers)
    @map.show(events)
    @setupRealtimeTracking(trackers)
