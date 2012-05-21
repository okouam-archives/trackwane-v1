class Trackwane.Views.Realtime.SpeedAlarms.Listing extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  template_id: "#speed-alarm-listing-template"

  events:
    "click a.row-action.info": "onInfoAction"
    "click a.row-action.delete": "onDeleteAction"

  initialize: (options) ->
    super(options)

  onInfoAction: (evt) ->
    alert "Not implemented"

  onDeleteAction: (evt) ->
    if confirm("Are you sure you want to delete this speed alarm?")
      @pubsub.trigger "speed-alarm:deleted", $(evt.currentTarget).parents("td").find(".name").data("id")
    false

  onRemove: (evt) ->
    if confirm("Are you sure you want to delete this speed alarm?")
      @publish("speed-alarm:deleted", $(evt.currentTarget).data("id"))
    false

  onSelect: (evt) ->
    @publish("speed-alarm:selected", $(evt.currentTarget).data("id"))
    false

  render: (alarms) ->
    @$el.html(@template(alarms))

