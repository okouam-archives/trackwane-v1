class Trackwane.Views.SpeedAlarms extends Backbone.View

  events:
    "click .remove": "onRemove"
    "click .select": "onSelect"

  onRemove: (evt) ->
    if confirm("Are you sure you want to delete this speed alarm?")
      this.pubsub.trigger("speed-alarm:deleted", $(evt.currentTarget).data("id"))
    false

  onSelect: (evt) ->
    @pubsub.trigger("speed-alarm:selected", $(evt.currentTarget).data("id"))
    false

  initialize: (options) ->
    @template = Handlebars.compile($("#speed-alarms-template").html())
    @pubsub = options.pubsub

  render: (alarms) ->
    @$el.html(@template(alarms))
    @$el.lionbars()

