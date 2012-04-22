class Trackwane.Controllers.RealtimeController extends Trackwane.Controllers.Base

  appEvents:
    "event:selected":         "onEventSelected",
    "places:toggle":          "onTogglePlaces",
    "geofence-alarms:toggle": "onToggleGeofences",

  initialize: (@options) ->
    @init(@options)
    @listing = new Trackwane.Views.Realtime.Events({el: "#canvas .listing", pubsub: @pubsub})
    @toolbar = new Trackwane.Views.Realtime.Toolbar({el: "#canvas .toolbar", pubsub: @pubsub})
    @map = new Trackwane.Views.Realtime.Map({el: "#map", pubsub: @pubsub});
    @map.render(options.extent, (() => @showInitialPositions(new Trackwane.Collections.RealtimeEvents(@options.events))))

  onToggleGeofences: () ->
    if @showing_geofences
      @map.hideGeofences()
      @showing_geofences = false
    else
      callbacks =
        success: (results) =>
          @map.showGeofences(results)
          @showing_geofences = true
      new Trackwane.Collections.GeofenceAlarms().fetch(callbacks)

  onTogglePlaces: () ->
    if @showing_places
      @map.hidePlaces()
      @showing_places = false
    else
      callbacks =
        success: (results) =>
          @map.showPlaces(results)
          @showing_places = true
      new Trackwane.Collections.Places().fetch(callbacks)

  setupRealtimeTracking: (events) ->
    pusher = new Pusher('fee5deb878965544bd90')
    events.each (event) =>
      channel = pusher.subscribe("#{event.get("account_id")}-#{event.get("device_id")}")
      channel.bind 'event-received', ((data) =>
        @listing.update(data)
        @map.showEvent(data))

  showInitialPositions: (events) ->
    @listing.render(events)
    @map.show(events)
    @setupRealtimeTracking(events)

  onEventSelected: (event_id) ->
    @map.center(event_id)

