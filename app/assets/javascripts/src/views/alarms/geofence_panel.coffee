class Trackwane.Views.Alarms.GeofencePanel extends Trackwane.Views.Base

  events:
    "click .cancel": "onCancel"
    "click .accept": "onAccept"

  initialize: (options) ->
    @pubsub = options.pubsub
    @template = Handlebars.compile($("#geofence-alarm-wizard-template").html())

  onAccept: ->
    callback =
      submitHandler: =>
        name = @$el.find("input[name='geofence_alarm[name]']").val()
        alarm = new Trackwane.Models.GeofenceAlarm({name: name})
        @pubsub.trigger("geofence:created", alarm)
    @$el.find("form").validate(_.extend(Trackwane.Models.GeofenceAlarm.validation_rules, callback))
    false

  onCancel: ->
    @pubsub.trigger("geofence:closing")
    false

  select: (geofence) ->
    @geofence = geofence

  render: (offset) ->
    @$el.html(@template())
    @$el.css("top", offset - 250) if (offset)

  close: ->
    @$el.empty()