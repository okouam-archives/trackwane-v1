class Trackwane.Models.Event extends Backbone.Model

  initialize: (attributes) ->
    format = new OpenLayers.Format.WKT();
    feature = format.read(attributes.lonlat);
    @geometry = OpenLayers.Projection.transform(feature.geometry, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

  getCoordinates: ->
    lonlat = new OpenLayers.LonLat(@get("longitude"), @get("latitude"))
    source = new OpenLayers.Projection("EPSG:4326")
    dest = new OpenLayers.Projection("EPSG:900913")
    return lonlat.transform(source, dest)

  toFeature: ->
    feature = new OpenLayers.Feature.Vector(@geometry, @attributes)
    feature.style =
      label: @get("name")
      labelOutlineColor: 'white'
      labelOutlineWidth: "4px"
      labelYOffset: 23
      fontWeight: "bold"
      pointRadius: 20
      externalGraphic: "/assets/marker-coupe-red.png"
      rotation: @get("heading")
    feature.id = @id
    feature.device_id = @get("device_id")
    feature
