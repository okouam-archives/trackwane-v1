class Trackwane.Views.Alarms.Listing extends Trackwane.Views.Base

  events:
    "click .speed.btn": "onCreateSpeedAlarm"
    "click .geofence.btn": "onCreateGeofenceAlarm"

  initialize: (options) ->
    @pubsub = options.pubsub
    @geofence_alarms_listing = new Trackwane.Views.GeofenceAlarms({el: "#alarm-listing .geofence-alarms", pubsub: @pubsub})
    @speed_alarms_listing = new Trackwane.Views.SpeedAlarms({el: "#alarm-listing .speed-alarms", pubsub: @pubsub})

  addGeofenceAlarm: (alarms) ->
    @geofence_alarms_listing.render(alarms)

  addSpeedAlarm: (alarms) ->
    @speed_alarms_listing.render(alarms)

  onCreateSpeedAlarm: (evt) ->
    @pubsub.trigger("speed:creating", evt)

  onCreateGeofenceAlarm: (evt) ->
    @pubsub.trigger("geofence:creating", evt)

