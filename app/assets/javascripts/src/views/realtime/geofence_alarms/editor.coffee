class Trackwane.Views.Realtime.GeofenceAlarms.Editor extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  validation_rules: Trackwane.Models.GeofenceAlarm.validation_rules

  template_id: "#geofence-alarm-editor-template"

  events:
    "click .cancel": "onCancel"
    "click .accept": "onAccept"

  initialize: (options) ->
    super(options)

  onAccept: ->
    callback =
      submitHandler: =>
        name = @$el.find("input[name='geofence_alarm[name]']").val()
        alarm = new Trackwane.Models.GeofenceAlarm({name: name, bounds: @polygon.asWKT()})
        @pubsub.trigger("geofence-alarm:created", alarm)
        false
    @accept(callback)

  onCancel: ->
    @pubsub.trigger("geofence-alarm-editor:closing")
    @hide()
    false

  select: (geofence) ->
    @geofence = geofence

  render: (offset) ->
    @show()
    @$el.html(@template())
    @$el.css("top", offset - 250) if offset