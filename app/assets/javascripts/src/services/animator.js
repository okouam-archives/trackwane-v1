Trackwane.Services.Animator = function(onAnimationFinished) {
  this.animations = [];
  this.frame = 0;
  this.onAnimationFinished = onAnimationFinished;
};

_.extend(Trackwane.Services.Animator.prototype, {

  add: function(animation) {
    if (console) console.debug("[animator] Adding animation for device " + animation.device_id + " at frame " + this.frame);
    if (_.any(this.animations, function(existing) {return existing.device_id == animation.device_id;})) {
      clearTimeout(this.timeout);
      throw new Error("Attempted to insert a duplication animation for device " + animation.device_id);
    }
    this.animations.push(animation);
  },

  animationLoop: function() {
    var animationsToRemove = [];
    if (console) console.debug("[animator] Executing animations at frame " + this.frame);
    if (!_.isEmpty(this.animations)) {
      _.each(this.animations, function(animation) {
        animation.execute(this.frame);
        if (animation.finished) {
          animationsToRemove.push(animation);
          this.onAnimationFinished(animation.device_id);
        }
      }.bind(this));
      _.each(animationsToRemove, function(animationToRemove) {
        this.animations = _.filter(this.animations, function(animation) {
          return animation.device_id != animationToRemove.device_id;
        });
      }.bind(this));
    }
    this.frame = this.frame + 1;
    this.timeout = setTimeout(this.animationLoop.bind(this), this.delta);
  },

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
  },

  path_angle: function(start, end) {
    if (console) console.debug("[animator] calculating path angle");
    dy = end.y - start.y;
    dx = end.x - start.x;
    theta = Math.atan2(dy, dx);
    return theta *= 180 / Math.PI;
  },

  start: function(delta) {
    this.delta = delta;
    this.animationLoop();
  }

});