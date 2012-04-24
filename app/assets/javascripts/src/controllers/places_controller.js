Trackwane.Controllers.PlacesController = Trackwane.Controllers.Base.extend({

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
    this.map = new Trackwane.Views.PlacesMap({el: "#map", pubsub: this.pubsub});
    this.map.render(options.extent);
    this.listing = new Trackwane.Views.Places.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.new_place_panel = new Trackwane.Views.NewPlacePanel({el: "#new-place-panel", pubsub: this.pubsub});
    this.render(new Trackwane.Collections.Places(options.places));
    this.isShowing = false;
  },

  onPlaceSelected: function(id) {
    this.map.center(id);
  },

  onToggleNames: function() {
    alert("onToggleNames");
  },

  onRemovePlace: function(id) {
    new Trackwane.Collections.Places().fetch({success: function(results) {
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
    console.debug(lonlat);
    if (lonlat) {
      place.setCoordinates(lonlat.x, lonlat.y);
      place.save(null, {
        success: function() {
          new Trackwane.Collections.Places().fetch({success: function(results) {
            this.render(results);
          }.bind(this)});
          this.stopEditing();
        }.bind(this),
        error: function() {
          alert("failure");
          this.stopEditing();
        }.bind(this)
      });      
    }
    else {
      alert("You must drawn on the map before saving");
    }
  },

  onNewPlaceCancel: function() {
    this.stopEditing();
  },

  stopEditing: function() {
    this.new_place_panel.close();
    this.map.stopEditing();
  },

  onCreatePlace: function(evt) {
    this.new_place_panel.render(300);
    this.map.allowPlaceSelection();
  }

});

