class Trackwane.Models.Place extends Backbone.Model

  urlRoot: "/places"

  initialize: (attributes) ->
    format = new OpenLayers.Format.WKT();
    feature = format.read(attributes.lonlat);
    @geometry = OpenLayers.Projection.transform(feature.geometry, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

  parse: (response) ->
    format = new OpenLayers.Format.WKT();
    feature = format.read(response.lonlat);
    response.geometry = OpenLayers.Projection.transform(feature.geometry, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    response

  toFeature: () ->
    feature = new OpenLayers.Feature.Vector(@geometry, @attributes)
    feature.style =
      label: @get("name"),
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      labelYOffset: 17,
      fontWeight: "bold",
      fontColor: "#084a8c",
      pointRadius: 6,
      externalGraphic: "/assets/default/layout/tab-close-on.gif"
    feature.id = @id
    feature

  @validation_rules:
    debug: true
    rules:
      "place[name]":
        required: true
        minlength: "3"
      "place[category]":
        required: true
        minlength: "3"
    messages:
      "place[name]":
        required: $.t("validation_places.name_required")
        minlength: $.t("validation_places.name_minlength")
      "place[category]":
        required: $.t("validation_places.category_required")
        minlength: $.t("validation_places.category_minlength")