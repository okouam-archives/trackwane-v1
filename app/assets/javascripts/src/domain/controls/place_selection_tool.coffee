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
    @cartography.degreeCoordinates(@point.x, @point.y)

  deactivate: () ->
    @draw_layer.destroyFeatures()
    @drawFeature.deactivate()
