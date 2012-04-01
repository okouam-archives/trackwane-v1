App.Controllers.PlacesController = App.Controllers.Base.extend({

  events: {
    "click .toolbar .button": "onToggleNames",
    "click button.new-place": "onCreatePlace"
  },

  appEvents: {
    "place:selected": "onPlaceSelected",
    "new-place:cancel": "onNewPlaceCancel",
    "place:created": "onPlaceCreated",
    "place:removed": "onRemovePlace"
  },

  initialize: function(options) {
    this.init(options);
    this.map = new App.Views.PlacesMap({el: "#map", pubsub: this.pubsub});
    this.map.render();
    this.listing = new App.Views.Places.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.new_place_panel = new App.Views.NewPlacePanel({el: "#new-place-panel", pubsub: this.pubsub});
    var places = new App.Collections.Places();
    places.fetch({success: function(results) {
      this.render(results);
    }.bind(this)});
    this.isShowing = false;
  },

  onPlaceSelected: function(id) {
    this.map.center(id);
  },

  onToggleNames: function() {
    alert("onToggleNames");
  },

  onRemovePlace: function(id) {
    new App.Collections.Places().fetch({success: function(results) {
      results.get(id).destroy();
      this.render(results);
    }.bind(this)});
  },

  render: function(results) {
    this.listing.render(results);
    this.map.show(results);
  },

  onPlaceCreated: function(place) {
    var lonlat = this.map.place_selection_tool.getCoordinates();
    place.setCoordinates(lonlat);
    place.save(null, {
      success: function() {
        new App.Collections.Places().fetch({success: function(results) {
          this.render(results);
        }.bind(this)});
        this.stopEditing();
      }.bind(this),
      error: function() {
        alert("failure");
        this.stopEditing();
      }.bind(this)
    });
    this.stopEditing();
  },

  onNewPlaceCancel: function() {
    this.stopEditing();
  },

  stopEditing: function() {
    this.new_place_panel.close();
    this.map.stopEditing();
  },

  onCreatePlace: function(evt) {
    this.new_place_panel.render(evt.screenY);
    this.map.allowPlaceSelection();
  }

});

