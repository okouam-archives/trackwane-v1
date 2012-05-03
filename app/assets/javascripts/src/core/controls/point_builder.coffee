class Trackwane.Core.Controls.PointBuilder

  constructor: (@map, @pubsub) ->
    @cartography = new Trackwane.Core.Helpers.Cartography(@map)
    @draw_layer = @cartography.createLayer("drawing_layer")
    @map.addLayer(@draw_layer)
    @drawFeature = new OpenLayers.Control.DrawFeature(@draw_layer, OpenLayers.Handler.Point)
    callbacks =
      featureadded: () =>
        @drawFeature.deactivate()
        feature = @draw_layer.features[0]
        @pubsub.trigger("app:point-builder:feature-created", feature.toWSG84().asWKT())
    @drawFeature.events.on callbacks
    @map.addControl(@drawFeature);

  activate: ->
    @drawFeature.activate()

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
