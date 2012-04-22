OpenLayers.Bounds.fromExtent = (extent) ->
  match = /\((.+) (.+),(.+) (.+)\)/.exec(extent)
  bounds = match[1..]
  sourceProjection = new OpenLayers.Projection("EPSG:4326");
  targetProjection = new OpenLayers.Projection("EPSG:900913");
  new OpenLayers.Bounds(bounds[1], bounds[2], bounds[3], bounds[0]).transform(sourceProjection, targetProjection)
