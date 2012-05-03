class Trackwane.Core.Framework.RealtimeMap extends OpenLayers.Map

  @create: (el, callback) ->

    gmap = new OpenLayers.Layer.Google("Streets")
    params = {theme: null, controls: [], minZoomLevel: 5, maxZoomLevel: 12, layers: [gmap]}
    @map = new OpenLayers.Map(el, params)

    if callback
      google.maps.event.addListener gmap.mapObject, 'tilesloaded', () ->
        callback()
        google.maps.event.clearListeners gmap.mapObject, 'tilesloaded'

    @map.addCommonControls()
    @map.createFeatureLayer("alarms")
    @map.createFeatureLayer("places")
    @map.createFeatureLayer("trackers", true)
    @map