class Trackwane.Services.PlaceSelectionTool

  constructor: (@map) ->
    @cartography = new Trackwane.Services.Cartography(@map)
    @draw_layer = @cartography.createLayer("drawing_layer")
    @map.addLayer(@draw_layer)
    @drawFeature = new OpenLayers.Control.DrawFeature(@draw_layer, OpenLayers.Handler.Point)
    callbacks =
      featureadded: () =>
        @drawFeature.deactivate()
        @point = @draw_layer.features[0].geometry
    @drawFeature.events.on callbacks
    @map.addControl(@drawFeature);

  activate: ->
    @drawFeature.activate()

  getCoordinates: () ->
    sourceProjection = new OpenLayers.Projection("EPSG:4326");
    targetProjection = new OpenLayers.Projection("EPSG:900913");
    @point.transform(sourceProjection, targetProjection)

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
