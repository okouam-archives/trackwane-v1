App.Views.Devices = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#device-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(places) {
    this.places = places;
    if (!this.container) {
      this.container = $("<div class='map-listing''><div>").appendTo(this.$el);
    }
    this.container.html(this.template(places));
  }

});