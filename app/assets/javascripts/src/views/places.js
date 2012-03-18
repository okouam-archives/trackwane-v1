App.Views.Places = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.pubsub.on("places:received", this.render.bind(this));
    var source = $("#place-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(places) {
    this.places = places;
    if (!this.container) {
      this.places.on('destroy', function() {
        this.render(this.places);
      }.bind(this));
      this.container = $("<div class='map-listing''><div>").appendTo(this.$el);
      this.container.on('click', 'a', function(evt) {
        this.pubsub.trigger("place:selected", $(evt.currentTarget).data("id"));
      }.bind(this));
    }
    this.container.html(this.template(places));
  }

});