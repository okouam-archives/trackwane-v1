class Trackwane.Views.Alarms.SpeedPanel extends Trackwane.Views.Base

  events:
    "click .cancel": "onCancel"
    "click .accept": "onAccept"

  initialize: (options) ->
    @pubsub = options.pubsub
    @template = Handlebars.compile($("#speed-alarm-wizard-template").html())

  onCancel: ->
    @pubsub.trigger("speed:closing")
    false

  render: (offset) ->
    @$el.html(@template())
    @$el.css("top", offset - 200) if offset

  close: ->
    @$el.empty()

  onAccept: ->
    callback =
      submitHandler: =>
        name = $("input[name='speed_alarm[name]']").val()
        speed = $('input[name="speed_alarm[speed]"]').val()
        alarm = new Trackwane.Models.SpeedAlarm({speed: speed, name: name})
        @pubsub.trigger("speed:created", alarm)
    validation_options = _.extend(Trackwane.Models.SpeedAlarm.validation_rules, callback)
    @$el.find("form").validate(validation_options)


