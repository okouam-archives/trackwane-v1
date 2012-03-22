App.Views.Schedules.Editor = App.Views.Base.extend({

  events: {
    "click .create": "onCreate",
    "click .delete": "onDelete",
    "click .save": "onSave",
    "click .closelabel": "onClose"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  onCreate: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("schedule:created", attributes)
  },

  onDelete: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("schedule:deleted", attributes)
  },

  onClose: function() {
    this.close();
  },

  onSave: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("schedule:saved", attributes)
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  },

  prepareTemplates: function() {
    var source = $("#editor-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(place) {
    this.$el.html(this.template(place));
    this.$el.show();
  }

});