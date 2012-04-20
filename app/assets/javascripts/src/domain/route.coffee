class Trackwane.Route

  constructor: (start, end)  ->
    @start = start.geometry
    @end = end.geometry
    @log = Trackwane.Logger.get("Route")

  getAngle: ->
    dy = @end.y - @start.y
    dx = @end.x - @start.x
    theta = Math.atan2(dy, dx)
    theta *= 180 / Math.PI
    theta + 180

  getPoints: (num) ->
    if @start.x is @end.x and @start.y is @end.y
      null
    else
      points = []
      range = _.range(1, num + 1, 1)
      _.each range, (i) =>
        delta = i * (1 / num)
        x = @start.x + delta * (@end.x - @start.x)
        y = @start.y + delta * (@end.y - @start.y)
        point = new OpenLayers.Geometry.Point(x, y)
        points.push(point)
      points
