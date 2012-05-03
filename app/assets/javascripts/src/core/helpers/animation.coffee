class Trackwane.Core.Helpers.Animation

  cursor: 0

  finished: 0

  constructor: (@feature, @path) ->
    @log = Trackwane.Logger.get("Animation")
    @device_id = feature.device_id

  execute: (frame) ->
    @log.debug("[animator] Animating device #{@device_id} (frame #{frame}; cursor #{@cursor}; steps #{@path.length})")
    unless @finished
      next_point = @path[@cursor]
      coordinates = new OpenLayers.LonLat(next_point.x, next_point.y)
      @feature.move(coordinates)
      @cursor = @cursor + 1
      @finished = true if @cursor >= @path.length
