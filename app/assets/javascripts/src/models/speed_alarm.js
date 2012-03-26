App.Models.SpeedAlarm = Backbone.Model.extend({

  urlRoot: "/speed_alarms",

  validate: function(attrs) {
    var errors = [];
    if (!attrs.name) errors.push("No name has been provided for the speed alarm");
    if (!attrs.speed) errors.push("No speed limit has been provided for the speed alarm");
    if (errors) return errors;
  }

});