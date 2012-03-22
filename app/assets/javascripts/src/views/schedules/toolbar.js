App.Views.Schedules.Toolbar = App.Views.Base.extend({

  events: {
    "click .button": "onCreateSchedule"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onCreateSchedule: function() {
    this.pubsub.trigger("schedule:creating")
  }

});