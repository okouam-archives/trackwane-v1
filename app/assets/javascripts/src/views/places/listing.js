Trackwane.Views.Places.Listing = Trackwane.Views.Base.extend({

  events: {
    "click a.select": "onSelect",
    "click a.remove": "onRemove"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
    $(window).resize(this.onResize.bind(this));
  },

  resize: function() {
    var window_height = $(window).height();
    var original_height = this.$el.height();
    var max_height = window_height - 150;
    if (original_height >= max_height) this.$el.height(max_height);
    else this.$el.height("auto");
    $('.lionbars').lionbars();
  },

  onResize: function() {
    this.render(this.places);
  },

  onRemove: function(evt) {
    if (confirm($.t("confirmation_places.delete"))) {
      var id = $(evt.currentTarget).data("id");
      this.pubsub.trigger("place:removed", id);
    }
  },

  onSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("place:selected", id);
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(places) {
    this.places = places;
    this.$el.html(this.template(places));
    this.$el.show();
		this.resize();
  }

});
