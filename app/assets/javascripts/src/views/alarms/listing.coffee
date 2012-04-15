class App.Views.Alarms.Listing extends App.Views.Base

  events:
    "click .speed.btn": "onCreateSpeedAlarm"
    "click .geofence.btn": "onCreateGeofenceAlarm"

  initialize: (options) ->
    @pubsub = options.pubsub
    @geofence_alarms_listing = new App.Views.GeofenceAlarms({el: "#alarm-listing .geofence-alarms", pubsub: @pubsub})
    @speed_alarms_listing = new App.Views.SpeedAlarms({el: "#alarm-listing .speed-alarms", pubsub: @pubsub})

  addGeofenceAlarm: (alarms) ->
    @geofence_alarms_listing.render(alarms)


  addSpeedAlarm: (alarms) ->
    @speed_alarms_listing.render(alarms)


  onCreateSpeedAlarm: (evt) ->
    @pubsub.trigger("speed:creating", evt)


  onCreateGeofenceAlarm: (evt) ->
    @pubsub.trigger("geofence:creating", evt)

