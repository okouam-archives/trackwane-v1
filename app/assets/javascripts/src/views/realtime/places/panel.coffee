class Trackwane.Views.Realtime.Places.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.Places

  events:
    "click #btn-new-place": "onCreatePlace"

  appEvents:
    "place:selected": "onPlaceSelected"
    "place:created": "onPlaceCreated"
    "place:deleted": "onPlaceDeleted"
    "place:show": "onPlaceShow"
    "place:hide": "onPlaceHide"
    "place-editor:closing": "onEditorClosing"
    "app:point-builder:feature-created": "onFeatureCreated"

  initialize: (options) ->
    super(options)
    @listing = new @Scope.Listing({el: "#place-panel .listing", pubsub: @pubsub})
    @editor = new @Scope.Editor({el: "#place-panel .editor", pubsub: @pubsub})
    @places = new Trackwane.Collections.Places(options.places)

  onFeatureCreated: (point) ->
    console.debug(point)
    @editor.point = point

  onPlaceShow: (id) ->
    place = @places.get(id)
    @publish("feature:show", place)

  onPlaceHide: (id) ->
    place = @places.get(id)
    @publish("feature:hide", place)

  onPlaceDeleted: (id) ->
    @places.get(id).destroy();
    @render()

  onEditorClosing: () ->
    @publish("app:point-builder:clear")

  onPlaceCreated: (place) ->
    callbacks =
      success: (model) =>
        @places.add(model)
        @editor.close()
        @onEditorClosing()
        @render()
    place.save(null, callbacks)

  onPlaceSelected: (id) ->
    place = @places.get(id)
    @publish("feature:select", place)

  onCreatePlace: (evt) ->
    @publish("app:point-builder:activate")
    @editor.render()

  render: () ->
    @listing.render(@places)