App.Controllers.PlacesController = App.Controllers.Base.extend({

  events: {
    "click .toolbar .button": "toggle"
  },

  initialize: function(options) {
    this.init(options);
    this.pubsub = _.extend({}, Backbone.Events);
    this.map = new App.Views.PlacesMap({el: "#map", pubsub: this.pubsub});
    this.map.render();
    this.listing = new App.Views.Places.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.new_place_panel = new App.Views.NewPlacePanel({el: "#new-place-panel", pubsub: this.pubsub});
    var places = new App.Collections.Places();
    places.fetch({success: function(results) {
      this.listing.render(results);
      this.map.show(results);
    }.bind(this)});
    this.isShowing = false;
  },

  toggle: function() {
     if (this.isShowing) {
      this.pubsub.trigger("place:creation:cancel");
      this.isShowing = false;
    } else {
      this.pubsub.trigger("place:creation:start");
      this.isShowing = true;
    }
  }

});

