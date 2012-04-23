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
      formatting =
        pointRadius: "${radius}"
        label: "${counter}"
        fillColor: "#397DB7"
        fillOpacity: 0.9
        strokeColor: "#1B4C7A"
        strokeWidth: 2
        fontColor: 'white'
        fontWeight: 'bold'
        strokeOpacity: 0.9
      context =
        radius: (feature) ->
          return feature.cluster.length + 10
        counter: (feature) ->
          return feature.cluster.length
      style = new OpenLayers.Style(formatting, context: context)
      console.debug(style)
      options =
        strategies: [new OpenLayers.Strategy.Cluster({distance: 20, threshold: 2})]
        styleMap: new OpenLayers.StyleMap
          "default": style,
          "select":
            fillColor: "#8aeeef",
            strokeColor: "#32a8a9"
      layer = new OpenLayers.Layer.Vector(name, options)
    else
      layer = new OpenLayers.Layer.Vector(name)
    @map.addLayer(layer)
    layer
