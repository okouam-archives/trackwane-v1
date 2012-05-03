class Trackwane.Views.Realtime.Trackers.Listing extends Trackwane.Core.Framework.View

  template_id: "#tracker-listing-template"

  events:
    "click a": "onSelection"

  initialize: (options) ->
    super(options)
    $(window).resize(@onResize.bind(this))

  onSelection: (evt) ->
    @pubsub.trigger("event:select", $(evt.currentTarget).data("id"))

  update: (event) ->
    entry = @findTracker(event.device_id)
    address = entry.find(".address")
    place = entry.find(".place")
    place_info = if event.place then "Proche de #{event.place.name}" else ""
    place.html(place_info)
    address.html(event.address) if address.text() != event.address

  onResize: ->
    window_height = $(window).height()
    original_height = @$el.height()
    max_height = window_height / 2
    @$el.height(max_height) if (original_height > max_height)

  findTracker: (id) ->
    @$el.find("tr[data-id='" + id + "']");

  render: (trackers) ->
    @$el.html(@template(trackers))
    @onResize()
