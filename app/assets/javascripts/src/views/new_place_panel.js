App.Views.NewPlacePanel = Backbone.View.extend({

  events: {
   "click .create": "createPlace"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  createPlace: function() {
    var name = this.$el.find("input").val();
    var category = this.$el.find("select").val();
    var place = new App.Models.Place({name: name, category: category});
    this.pubsub.trigger("place:created", place);
  },

  render: function() {
    var template = Handlebars.compile($("#new-place-panel-template").html());
    this.$el.html(template);
  }

});