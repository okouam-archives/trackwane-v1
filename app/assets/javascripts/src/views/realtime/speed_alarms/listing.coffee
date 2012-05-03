class Trackwane.Views.Realtime.SpeedAlarms.Listing extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  template_id: "#speed-alarm-listing-template"

  events:
    "click .remove": "onRemove"
    "click .select": "onSelect"

  initialize: (options) ->
    super(options)

  onRemove: (evt) ->
    if confirm("Are you sure you want to delete this speed alarm?")
      @publish("speed-alarm:deleted", $(evt.currentTarget).data("id"))
    false

  onSelect: (evt) ->
    @publish("speed-alarm:selected", $(evt.currentTarget).data("id"))
    false

  render: (alarms) ->
    @$el.html(@template(alarms))
    @$el.lionbars()

