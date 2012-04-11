App.Services.Animator = function() {

};

_.extend(App.Services.Animator.prototype, {

  interpolate: function(start, end, numPoints) {
    if (start.x == end.x && start.y == end.y) return null;
    var points = [];
    for(i = 1; i < (numPoints + 1); i++) {
      var delta = i * (1/numPoints);
      var x = start.x + (delta * (end.x - start.x));
      var y = start.y + (delta * (end.y - start.y));
      var point = new OpenLayers.Geometry.Point(x, y);
      points.push(point)
    }
    return points;
  }
});