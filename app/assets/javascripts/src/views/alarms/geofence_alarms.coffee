class App.Views.GeofenceAlarms extends App.Views.Base

  events:
    "click .remove": "onRemove"
    "click .select": "onSelect"

  onRemove: (evt) ->
    if confirm("Are you sure you want to delete this geofence alarm?")
      @pubsub.trigger("geofence-alarm:deleted", $(evt.currentTarget).data("id"))
    false

  onSelect: (evt) ->
    @pubsub.trigger("geofence-alarm:selected", $(evt.currentTarget).data("id"))
    false

  initialize: (options) ->
    @template = Handlebars.compile($("#geofence-alarms-template").html())
    @pubsub = options.pubsub

  render: (alarms) ->
    @$el.html(@template(alarms))
    @$el.lionbars()
