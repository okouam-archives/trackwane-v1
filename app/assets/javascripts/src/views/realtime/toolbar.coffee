class Trackwane.Views.Realtime.Toolbar extends Backbone.View

  events:
    "click .places": "onClickPlaces"
    "click .geofences": "onClickGeofenceAlarms"

  initialize: (options) ->
    @pubsub = options.pubsub
    @setElement(@el)

  onClickPlaces: (evt) ->
    $(evt.currentTarget).toggleClass("highlight")
    @pubsub.trigger("places:toggle")

  onClickGeofenceAlarms: (evt) ->
    $(evt.currentTarget).toggleClass("highlight")
    @pubsub.trigger("geofence-alarms:toggle")
