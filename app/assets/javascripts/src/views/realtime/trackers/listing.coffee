class Trackwane.Views.Realtime.Trackers.Listing extends Trackwane.Core.Framework.View

  template_id: "#tracker-listing-template"

  events:
    "click a.portrait": "onSelection"
    "click a.name": "onSelection"
    "click a.row-action.info": "onInfoAction"
    "click a.row-action.delete": "onDeleteAction"
    "click a.row-action.history": "onHistoryAction"

  initialize: (options) ->
    super(options)

  onSelection: (evt) ->
    @pubsub.trigger("tracker:selected", $(evt.currentTarget).data("id"))

  onInfoAction: (evt) ->
    alert "Not implemented"

  onDeleteAction: (evt) ->
    if confirm("Are you sure you want to delete this GPS tracker?")
      @pubsub.trigger("tracker:deleted", $(evt.currentTarget).parents("td").find(".name").data("id"))
    false

  onHistoryAction: (evt) ->
    alert "Not implemented"

  update: (event) ->
    entry = @findTracker(event.get("device_id"))
    image = entry.find(".portrait")
    originalColour = entry.css("background-color");
    entry.animate {backgroundColor: $.Color("#ccc")}, 500, ->
      entry.animate({backgroundColor: $.Color(originalColour)}, 1500, null)
    address = entry.find(".address")
    place = entry.find(".place")
    position = event.get("place") || event.get("address")
    address.html(position)
    entry.find(".status-indicator").css("background-color", "green")

  findTracker: (id) ->
    @$el.find("tr[data-id='" + id + "']");

  render: (trackers) ->
    @$el.html(@template(trackers))
