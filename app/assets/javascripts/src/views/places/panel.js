App.Views.NewPlacePanel = App.Views.Base.extend({

  events: {
   "click button.accept": "onAccept",
   "click button.cancel": "onCancel"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.template = Handlebars.compile($("#new-place-panel-template").html());
    this.handleApplicationEvents();
  },

  render: function(offset) {
    this.$el.html(this.template);
    if (offset) {
      this.$el.css("top", offset - 200);
    }
  },

  onAccept: function() {
    var name = this.$el.find("#place_name").val();
    var category = this.$el.find("#place_category").val();
    this.createPlace(name, category);
    return false;
  },

  onCancel: function() {
    this.pubsub.trigger("new-place:cancel");
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