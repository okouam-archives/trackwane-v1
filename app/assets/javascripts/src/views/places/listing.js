App.Views.Places.Listing = App.Views.Base.extend({

  appEvents: {
    "places:received": "render",
    "place:removed": "render"
  },

  events: {
    "click a": "select"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
    this.handleApplicationEvents();
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  select: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("place:selected", id);
  },

  render: function(places) {
    this.$el.html(this.template(places));
  }

});