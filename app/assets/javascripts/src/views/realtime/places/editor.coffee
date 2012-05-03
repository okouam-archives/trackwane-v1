class Trackwane.Views.Realtime.Places.Editor extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  validation_rules: Trackwane.Models.Place.validation_rules

  template_id: "#place-editor-template"

  events:
   "click button.accept": "onAccept"
   "click button.cancel": "onCancel"

  initialize: (options) ->
    super(options)

  onAccept: () ->
    callback =
      submitHandler: () =>
        name = @select("#place_name").val()
        category = @select("#place_category").val()
        @createPlace(name, category, @point.asWKT())
        false
    @accept(callback)

  onCancel: () ->
    @publish("place-editor:closing")
    @close()

  createPlace: (name, category, lonlat) ->
    place = new Trackwane.Models.Place({name: name, category: category, lonlat: lonlat})
    @publish("place:created", place)