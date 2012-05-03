OpenLayers.Map::createFeatureLayer = (name, useClustering) ->
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
  @addLayer(layer)
  layer

OpenLayers.Map::addCommonControls = () ->
    panZoom = new OpenLayers.Control.PanZoomBar()
    panZoom.zoomWorldIcon = false
    controls = [
      new OpenLayers.Control.ScaleLine()
      new OpenLayers.Control.DragPan()
      new OpenLayers.Control.Navigation()
      panZoom
    ]
    @.addControls(controls)
    $.each(controls, ((index, item) -> item.activate()))
