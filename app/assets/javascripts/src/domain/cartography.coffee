class Trackwane.Services.Cartography

  constructor: (@map) ->

  createMap: (el, callback) ->
    OpenLayers.ImgPath = '/assets/OpenLayers/'
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3
    gmap = new OpenLayers.Layer.Google("Streets")
    params = {theme: null, controls: [], minZoomLevel: 5, maxZoomLevel: 12, layers: [gmap]}
    @map = new OpenLayers.Map(el, params)
    if callback
      google.maps.event.addListener gmap.mapObject, 'tilesloaded', () ->
        callback()
        google.maps.event.clearListeners gmap.mapObject, 'tilesloaded'
    @addCommonControls()
    @map

  addCommonControls: ->
    panZoom = new OpenLayers.Control.PanZoomBar()
    panZoom.zoomWorldIcon = false
    controls = [
      new OpenLayers.Control.ScaleLine()
      new OpenLayers.Control.DragPan()
      new OpenLayers.Control.Navigation()
      panZoom
    ]
    @map.addControls(controls)
    $.each(controls, ((index, item) -> item.activate()))

  createLayer: (name, useClustering) ->
    throw "A layer cannot be created by the Cartography Service unless it has been assigned a map." unless @map
    if useClustering
      layer = new OpenLayers.Layer.Vector(name, {strategies: [new OpenLayers.Strategy.Cluster()]})
    else
      layer = new OpenLayers.Layer.Vector(name)
    @map.addLayer(layer)
    layer
