OpenLayers.Bounds.fromExtent = (extent) ->
  match = /\((.+) (.+),(.+) (.+)\)/.exec(extent)
  bounds = match[1..]
  sourceProjection = new OpenLayers.Projection("EPSG:4326");
  targetProjection = new OpenLayers.Projection("EPSG:900913");
  new_bounds = new OpenLayers.Bounds(bounds[0], bounds[1], bounds[2], bounds[3]).transform(sourceProjection, targetProjection)
  new_bounds
