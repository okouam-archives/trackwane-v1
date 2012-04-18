class Trackwane.Views.Realtime.Events extends Backbone.View

  events:
    "click a": "onSelection"

  initial_render: true

  onSelection: (evt) ->
    @pubsub.trigger("event:selected", $(evt.currentTarget).data("id"))

  initialize: (options) ->
    @pubsub = options.pubsub
    source = $("#realtime-device-template").html()
    @template = Handlebars.compile(source)
    $(window).resize(@onResize.bind(this))

  onResize: ->
    window_height = $(window).height()
    original_height = this.$el.height()
    max_height = window_height - 100
    @$el.height(max_height) if (original_height > max_height)
    @$el.lionbars()

  update: (events) ->
    events.each((event) =>
      attributes = event.attributes
      entry = @getDeviceTile(attributes.device_id)
      address = entry.find(".address")
      address.html(attributes.address) if (address.text() != attributes.address)
    )

  getDeviceTile: (id) ->
    @$el.find("tr[data='" + id + "']");

  render: (events) ->
    if (this.initial_render)
      @$el.html(this.template(events))
      @onResize()
      @initial_render = false
    else
      @update(events)
