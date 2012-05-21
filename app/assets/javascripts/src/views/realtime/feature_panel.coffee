class Trackwane.Views.Realtime.FeaturePanel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime

  initialize: (options) ->
    super(options)
    @place_panel = new @Scope.Places.Panel({el: "#place-panel", pubsub: @pubsub, places: options.places})
    @geofence_alarm_panel = new @Scope.GeofenceAlarms.Panel({el: "#canvas #geofence-alarm-panel", pubsub: @pubsub, geofence_alarms: options.geofence_alarms})
    @speed_alarm_panel = new @Scope.SpeedAlarms.Panel({el: "#canvas #speed-alarm-panel", pubsub: @pubsub, speed_alarms: options.speed_alarms})

  render: (options) ->
    @place_panel.render()
    @speed_alarm_panel.render()
    @geofence_alarm_panel.render()