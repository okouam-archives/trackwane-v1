OpenLayers.Feature::toLonLat = ->
  new OpenLayers.LonLat(@geometry.x, @geometry.y)

OpenLayers.Feature::followPath = (animator, path) ->
  animation = new Trackwane.Services.Animation(@, path)
  animator.add(animation)

OpenLayers.Feature::rotate = (angle) ->
  @style.rotation = angle
  @layer.drawFeature(@)

OpenLayers.Feature::asWKT = () ->
  format = new OpenLayers.Format.WKT();
  return format.write(@);

OpenLayers.Feature::toWSG84 = () ->
  sourceProjection = new OpenLayers.Projection("EPSG:900913");
  targetProjection = new OpenLayers.Projection("EPSG:4326");
  @geometry = @geometry.transform(sourceProjection, targetProjection)
  @

