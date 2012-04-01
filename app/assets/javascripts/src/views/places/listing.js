App.Views.Places.Listing = App.Views.Base.extend({

  events: {
    "click a.select": "onSelect",
    "click a.remove": "onRemove"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  onRemove: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("place:removed", id);
  },

  onSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("place:selected", id);
  },

  render: function(places) {
    this.$el.html(this.template(places));

  }

});