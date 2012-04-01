App.Views.Alerts.Listing = App.Views.Base.extend({

  events: {
    "click tr" : "onAlertSelect",
    "click button.save": "onAlertSave",
    "click button.remove": "onAlertRemove",
    "click button.create": "onAlertCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onAlertSave: function() {
    this.pubsub.trigger("alert:saved");
  },

  onAlertRemove: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("alert:deleted", id);
  },

  onAlertSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("alert:selected", id);
  },

  onAlertCreate: function() {
    this.pubsub.trigger("alert:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.$el.html(this.template(users));
    this.$el.show();
    this.$el.lionbars();
  }

});