class Trackwane.Core.Helpers.Mapper

  constructor: () ->
    @cartography = new Trackwane.Core.Helpers.Cartography()

  toFeature: (model, style) ->
    point = OpenLayers.Geometry.Point(model.get("longitude"), model.get("latitude"));
    point = OpenLayers.Projection.transform(point, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = model.id;
    if style
      feature.style = style
    else
      feature.style =
        pointRadius: 10
        externalGraphic: "/assets/arrow.png"
        rotation: model.get("heading")
    feature

  toRealtimeFeature: (model) ->
    style =
      label: model.get("name")
      labelOutlineColor: 'white'
      labelOutlineWidth: "4px"
      labelYOffset: 23
      fontWeight: "bold"
      pointRadius: 20
      externalGraphic: "/assets/marker-coupe-red.png"
      rotation: model.get("heading")
    feature = @toGraphicFeature(model.get("longitude"), model.get("latitude"), model, style, model.id)
    feature.device_id = model.get("device_id")
    feature

  toGraphicFeature: (longitude, latitude, model, style, id) ->
    point = new OpenLayers.Geometry.Point(longitude, latitude);
    point = OpenLayers.Projection.transform(point, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = id
    feature.style = style
    feature

  toPlaceFeatures: (places) ->
    return places.map (place) =>
      @toPlaceFeature(place)

  toGeofenceFeature: (name, coordinates) ->
    format = new OpenLayers.Format.WKT();
    feature = format.read(coordinates);
    feature.style =
      label: name,
      labelOutlineColor: 'white'
      labelOutlineWidth: "4px"
      fontWeight: "bold"
      fontColor: "#084a8c"
      fillColor: "#ee9900"
      fillOpacity: 0.3
      strokeOpacity: 1
      strokeWidth: 1
      strokeColor: "#ee9900"
    feature

  toGeofenceFeatures: (geofences) ->
    geofences.map (geofence) =>
      coordinates = geofence.get("coordinates")
      name = geofence.get("name")
      @toGeofenceFeature(name, coordinates)
