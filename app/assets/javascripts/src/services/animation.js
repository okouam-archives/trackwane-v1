Trackwane.Services.Animation = function(device_id, feature, path) {
  this.cursor = 0;
  this.feature = feature;
  this.device_id = device_id;
  this.path = path;
  this.finished = false;
};

_.extend(Trackwane.Services.Animation.prototype, {

  execute: function(frame) {
    if (console) console.debug("[animator] Executing animation for device " +
      this.device_id + " (frame " + frame + "; cursor " + this.cursor + "; steps " + this.path.length + ")");
    if (!this.finished) {
      var next_coordinates = this.path[this.cursor];
      this.feature.move(new OpenLayers.LonLat(next_coordinates.x, next_coordinates.y));
      this.cursor = this.cursor + 1;
      if (this.cursor >= this.path.length) this.finished = true;
    }
  }

});