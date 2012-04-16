Trackwane.Views.NewPlacePanel = Trackwane.Views.Base.extend({

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
   var callback = {
      submitHandler: function() {
        var name = this.$el.find("#place_name").val();
        var category = this.$el.find("#place_category").val();
        this.createPlace(name, category);
        return false
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(App.Models.Place.validation_rules, callback));
  },

  onCancel: function() {
    this.pubsub.trigger("new-place:cancel");
  },

  close: function() {
    this.$el.empty();
  },

  createPlace: function(name, category) {
    var place = new Trackwane.Models.Place({name: name, category: category});
    this.pubsub.trigger("place:created", place);
  }

});
