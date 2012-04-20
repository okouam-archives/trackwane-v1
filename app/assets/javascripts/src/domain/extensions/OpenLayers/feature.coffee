OpenLayers.Feature::toLonLat = ->
  new OpenLayers.LonLat(@geometry.x, @geometry.y)

OpenLayers.Feature::followPath = (animator, path) ->
  animation = new Trackwane.Services.Animation(@, path)
  animator.add(animation)

OpenLayers.Feature::rotate = (angle) ->
  @style.rotation = angle
  @layer.drawFeature(@)