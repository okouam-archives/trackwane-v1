class Trackwane.Core.Controls.PointBuilder

  constructor: (@map, @pubsub) ->
    @draw_layer = new OpenLayers.Layer.Vector("drawing_layer")
    @map.addLayer(@draw_layer)
    @drawFeature = new OpenLayers.Control.DrawFeature(@draw_layer, OpenLayers.Handler.Point)
    callbacks =
      featureadded: () =>
        @drawFeature.deactivate()
        feature = @draw_layer.features[0]
        @pubsub.trigger("app:point-builder:feature-created", feature.toWSG84())
    @drawFeature.events.on callbacks
    @map.addControl(@drawFeature);

  activate: ->
    @drawFeature.activate()

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
