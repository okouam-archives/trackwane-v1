App.Views.NewPlacePanel = App.Views.Base.extend({

  events: {
   "click button": "onCreatePlace",
   "click .closelabel": "onClose"
  },

  appEvents: {
    "place:creation:cancel": "close",
    "place:creation:start": "render"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.template = Handlebars.compile($("#new-place-panel-template").html());
    this.handleApplicationEvents();
  },

  render: function() {
    this.$el.html(this.template);
  },

  onClose: function() {
    this.pubsub.trigger("place:creation:cancelled");
    this.close();
  },

  onCreatePlace: function() {
    var name = this.$el.find("input").val();
    var category = this.$el.find("select").val();
    this.createPlace(name, category);
    return false;
  },

  close: function() {
    this.$el.empty();
  },

  createPlace: function(name, category) {
    if (name == "") {
      alert("Please choose a name for this new place.");
    } else if (category == "") {
      alert("Please select a category for this new place.");
    } else {
      var place = new App.Models.Place({name: name, category: category});
      this.pubsub.trigger("place:created", place);
    }
  }

});