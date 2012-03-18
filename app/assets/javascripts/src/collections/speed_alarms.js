App.Collections.SpeedAlarms = Backbone.Collection.extend({

  model: App.Models.SpeedAlarm,

  url: "/speed_alarms",

  parse: function(response) {
    return response.results;
  }

});