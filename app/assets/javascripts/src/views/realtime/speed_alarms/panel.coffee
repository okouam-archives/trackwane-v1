class Trackwane.Views.Realtime.SpeedAlarms.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.SpeedAlarms

  events:
    "click #btn-new-speed-alarm": "onCreateSpeedAlarm"
    "click #toggle-speed-alarms": "onShowHidePanel"

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

  onShowHidePanel: () ->
    $(@$el).find(".listing").toggle('slow')

  onSpeedAlarmSelected: (event_id) ->
    @pubsub.trigger("app:action")

  onFeatureCreated: (polygon) ->
    @editor.polygon = polygon

  onSpeedAlarmDeleted: (id) ->
    @speed_alarms.get(id).destroy();
    @render()

  onSpeedAlarmSaved: () ->

  onSpeedAlarmCreated: (speed_alarm) ->
    callbacks =
      success: (model) =>
        @speed_alarms.add(model)
        @editor.close()
        @onEditorClosing()
        @render()
    speed_alarm.save(null, callbacks)

  onCreateSpeedAlarm: (evt) ->
    @publish("app:polygon-builder:activate")
    @editor.render()

  onEditorClosing: () ->
    @publish("app:polygon-builder:clear")

  render: () ->
    @listing.render(@speed_alarms)
