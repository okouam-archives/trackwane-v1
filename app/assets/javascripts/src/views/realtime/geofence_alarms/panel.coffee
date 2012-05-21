class Trackwane.Views.Realtime.GeofenceAlarms.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.GeofenceAlarms

  events:
    "click #btn-new-geofence-alarm": "onCreateGeofenceAlarm"
    "click #toggle-geofence-alarms": "onShowHidePanel"

  appEvents:
    "event:select": "onSelectEvent"
    "geofence-alarm:created": "onGeofenceAlarmCreated"
    "geofence-alarm:deleted": "onGeofenceAlarmDeleted"
    "geofence-alarm-editor:closing": "onEditorClosing"
    "app:polygon-builder:feature-created": "onFeatureCreated"

  initialize: (options) ->
    super(options)
    @listing = new @Scope.Listing({el: "#geofence-alarm-panel #geofence-alarms", pubsub: @pubsub})
    @editor = new @Scope.Editor({el: "#geofence-alarm-panel .editor", pubsub: @pubsub})
    @geofence_alarms = new Trackwane.Collections.GeofenceAlarms(options.geofence_alarms)

  onShowHidePanel: () ->
    $(@$el).find(".listing").toggle('slow')

  onFeatureCreated: (polygon) ->
    @editor.polygon = polygon

  onGeofenceAlarmCreated: (geofence_alarm) ->
    callbacks =
      success: (model) =>
        @geofence_alarms.add(model)
        @editor.close()
        @onEditorClosing()
        @render()
    geofence_alarm.save(null, callbacks)

  onGeofenceAlarmDeleted: (id) ->
    @geofence_alarms.get(id).destroy();
    @render()

  onSelectEvent: (event_id) ->
    @pubsub.trigger("app:action")

  onEditorClosing: () ->
    @pubsub.trigger("app:polygon-builder:clear")

  onCreateGeofenceAlarm: (evt) ->
    @pubsub.trigger("app:polygon-builder:activate")
    @editor.render()

  render: () ->
    @listing.render(@geofence_alarms)
