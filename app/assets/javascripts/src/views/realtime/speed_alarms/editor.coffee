class Trackwane.Views.Realtime.SpeedAlarms.Editor extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  validation_rules: Trackwane.Models.SpeedAlarm.validation_rules

  template_id: "#speed-alarm-editor-template"

  events:
    "click .cancel": "onCancel"
    "click .accept": "onAccept"

  initialize: (options) ->
    super(options)

  onAccept: ->
    callback =
      submitHandler: =>
        name = $("input[name='speed_alarm[name]']").val()
        speed = $('input[name="speed_alarm[speed]"]').val()
        alarm = new Trackwane.Models.SpeedAlarm({speed: speed, name: name, bounds: @polygon.asWKT()})
        @pubsub.trigger("speed-alarm:created", alarm)
        false
    @accept(callback)

  onCancel: ->
    @pubsub.trigger("speed-alarm-editor:closing")
    false

  render: (offset) ->
    @$el.html(@template())
    @$el.css("top", offset - 200) if offset
    @show()



