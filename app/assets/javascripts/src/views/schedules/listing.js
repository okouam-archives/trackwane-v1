App.Views.Schedules.Listing = App.Views.Base.extend({

  events: {
    "click tr" : "onScheduleSelect",
    "click button.save": "onScheduleSave",
    "click button.delete": "onScheduleDelete",
    "click button.create": "onScheduleCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onScheduleSave: function() {
    this.pubsub.trigger("schedule:saved");
  },

  onScheduleDelete: function() {
    this.pubsub.trigger("schedule:deleted");
  },

  onScheduleSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("schedule:selected", id);
  },

  onScheduleCreate: function() {
    this.pubsub.trigger("schedule:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.$el.html(this.template(users));
    this.$el.show();
  }

});