class Trackwane.Core.Controls.PolygonBuilder

  constructor: (@map, @pubsub) ->
    cartography = new Trackwane.Core.Helpers.Cartography(map)
    @draw_layer = cartography.createLayer("drawing_layer")
    @map.addLayer(@draw_layer)
    @drawFeature = new OpenLayers.Control.DrawFeature(@draw_layer, OpenLayers.Handler.Polygon)
    callbacks =
      featureadded: () =>
        polygon = @draw_layer.features[0]
        @pubsub.trigger("app:polygon-builder:feature-created", polygon.toWSG84())
        @drawFeature.deactivate()
    @drawFeature.events.on(callbacks);
    @map.addControl(@drawFeature);

  activate: () ->
    @drawFeature.activate();

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
