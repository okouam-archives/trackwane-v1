class Trackwane.Services.GeofenceDrawingTool

  constructor: (@map) ->
    cartography = new Trackwane.Services.Cartography(map)
    @draw_layer = cartography.createLayer("drawing_layer")
    @map.addLayer(@draw_layer)
    @drawFeature = new OpenLayers.Control.DrawFeature(@draw_layer, OpenLayers.Handler.Polygon)
    callbacks =
      featureadded: () =>
        @drawFeature.deactivate()
    @drawFeature.events.on(callbacks);
    @map.addControl(@drawFeature);

  activate: () ->
    @drawFeature.activate();

  getCoordinates: () ->
    return null if @draw_layer.features.length < 1
    format = new OpenLayers.Format.WKT();
    return format.extractGeometry(@draw_layer.features[0].geometry);

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
