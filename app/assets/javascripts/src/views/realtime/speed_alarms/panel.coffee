class Trackwane.Views.Realtime.SpeedAlarms.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.SpeedAlarms

  events:
    "click #btn-new-speed-alarm": "onCreateSpeedAlarm"

  appEvents:
    "speed-alarm:selected": "onSpeedAlarmSelected"
    "speed-alarm:deleted": "onSpeedAlarmDeleted"
    "speed-alarm:created": "onSpeedAlarmCreated"
    "speed-alarm:saved": "onSpeedAlarmSaved"
    "speed-alarm-editor:closing": "onEditorClosing"
    "app:polygon-builder:feature-created": "onFeatureCreated"


  initialize: (options) ->
    super(options)
    @listing = new @Scope.Listing({el: "#speed-alarms", pubsub: @pubsub})
    @editor = new @Scope.Editor({el: "#speed-alarm-panel .editor", pubsub: @pubsub})
    @speed_alarms = new Trackwane.Collections.SpeedAlarms(options.speed_alarms)

  onSpeedAlarmSelected: (event_id) ->
    @pubsub.trigger("app:action")

  onFeatureCreated: (polygon) ->
    @editor.polygon = polygon

  onSpeedAlarmDeleted: () ->

  onSpeedAlarmSaved: () ->

  onSpeedAlarmCreated: () ->

  onCreateSpeedAlarm: (evt) ->
    @publish("app:polygon-builder:activate")
    @editor.render()

  onEditorClosing: () ->
    @publish("app:polygon-builder:clear")

  render: () ->
    @listing.render(@speed_alarms)
