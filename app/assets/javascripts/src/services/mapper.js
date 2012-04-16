Trackwane.Services.Mapper = function() {
  this.cartography = new Trackwane.Services.Cartography();
};

_.extend(Trackwane.Services.Mapper.prototype, {

  toFeature: function(model, style) {
    var lonlat = this.cartography.mercatorCoordinates(model.get("longitude"), model.get("latitude"));
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = model.id;
    if (style) feature.style = style;
    else feature.style = {pointRadius: 10, externalGraphic: "/assets/arrow.png", rotation: model.get("heading")};
    return feature;
  },

  toRealtimeFeature: function(model) {
    var style = {
      label: model.get("name"),
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      labelYOffset: 23,
      fontWeight: "bold",
      pointRadius: 20,
      externalGraphic: "/assets/marker-coupe-red.png",
      rotation: model.get("heading")
    };
    var feature =  this.toGraphicFeature(model.get("longitude"), model.get("latitude"), model, style, model.id);
    feature.device_id = model.get("device_id");
    return feature;
  },

  toDestinationFeature: function(model_data) {
    var style = {
      pointRadius: 5,
      externalGraphic: "/assets/ajax-loader.gif"
    };
    var feature = this.toGraphicFeature(model_data.longitude, model_data.latitude, model_data, style, model_data.id);
    feature.device_id = model_data.device_id;
    return feature;
  },

  toGraphicFeature: function(longitude, latitude, model, style, id) {
    var lonlat = this.cartography.mercatorCoordinates(longitude, latitude);
    var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new OpenLayers.Feature.Vector(point, model);
    feature.id = id;
    feature.style = style;
    return feature;
  },

  toPlaceFeatures: function(places) {
    return places.map(function(place) {
      return this.toPlaceFeature(place);
    }.bind(this))
   },

  toPlaceFeature: function(model) {
    var style = {
      label: model.get("name"),
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      labelYOffset: 17,
      fontWeight: "bold",
      fontColor: "#084a8c",
      pointRadius: 6,
      externalGraphic: "/assets/default/layout/tab-close-on.gif"
    };
    return this.toGraphicFeature(model.get("longitude"), model.get("latitude"), model, style, model.id);
  },

  toGeofenceFeature: function(name, coordinates) {
    var format = new OpenLayers.Format.WKT();
    var feature = format.read(coordinates);
    feature.style = {
      label: name,
      labelOutlineColor: 'white',
      labelOutlineWidth: "4px",
      fontWeight: "bold",
      fontColor: "#084a8c",
      fillColor: "#ee9900",
      fillOpacity: 0.3,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeColor: "#ee9900"
    };
    return feature;
  },

  toGeofenceFeatures: function(geofences) {
    return geofences.map(function(geofence) {
      var coordinates = geofence.get("coordinates");
      var name = geofence.get("name");
      return this.toGeofenceFeature(name, coordinates);
    }.bind(this));
  }

});