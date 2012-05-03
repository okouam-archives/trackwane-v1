class Trackwane.Views.Realtime.FeaturePanel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime

  events:
    "click a.speed-alarms": "onShowSpeedAlarms"
    "click a.places": "onShowPlaces"
    "click a.geofence-alarms": "onShowGeofenceAlarms"

  initialize: (options) ->
    super(options)
    @place_panel = new @Scope.Places.Panel({el: "#place-panel", pubsub: @pubsub, places: options.places})
    @geofence_alarm_panel = new @Scope.GeofenceAlarms.Panel({el: "#canvas #geofence-alarm-panel", pubsub: @pubsub, geofence_alarms: options.geofence_alarms})
    @speed_alarm_panel = new @Scope.SpeedAlarms.Panel({el: "#canvas #speed-alarm-panel", pubsub: @pubsub, speed_alarms: options.speed_alarms})

  render: (options) ->
    @place_panel.render()
    @speed_alarm_panel.render()
    @geofence_alarm_panel.render()

  onShowSpeedAlarms: () ->
    @hidePanels()
    @speed_alarm_panel.show()

  onShowPlaces: () ->
    @hidePanels()
    @place_panel.show()

  onShowGeofenceAlarms: () ->
    @hidePanels()
    @geofence_alarm_panel.show()

  hidePanels: () ->
    @speed_alarm_panel.hide()
    @geofence_alarm_panel.hide()
    @place_panel.hide()