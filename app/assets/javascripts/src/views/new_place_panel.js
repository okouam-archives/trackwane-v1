App.Views.NewPlacePanel = Backbone.View.extend({

  events: {
   "click button": "createPlace"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  createPlace: function() {
    var name = this.$el.find("input").val();
    var category = this.$el.find("select").val();
    if (name == "") {
      alert("Please choose a name for this new place.");
      return;
    }
    if (category == "") {
      alert("Please select a category for this new place.");
      return;
    }
    var place = new App.Models.Place({name: name, category: category});
    this.pubsub.trigger("place:created", place);
  },

  render: function() {
    var template = Handlebars.compile($("#new-place-panel-template").html());
    this.$el.html(template);
  }

});