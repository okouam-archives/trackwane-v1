App.Views.Alarms.Toolbar = App.Views.Base.extend({

  events:
    "click .speed.button": "onToggleSpeedAlarms"
    "click .geofence.button": "onToggleGeofenceAlarms"
    "click .clear.button": "clearAlarms"

  initialize: (options) ->
    @pubsub = options.pubsub

  clearAlarms: ->
    @pubsub.trigger("alarms:clear")

  onToggleSpeedAlarms: ->
    @pubsub.trigger("speed-alarms:show")

  onToggleGeofenceAlarms: ->
    @pubsub.trigger("geofence-alarms:show")

})