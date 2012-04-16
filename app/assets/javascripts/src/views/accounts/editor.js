Trackwane.Views.Accounts.Editor = Trackwane.Views.Base.extend({

  events: {
    "click .create": "onCreate",
    "click .delete": "onDelete",
    "click .save": "onSave",
    "click .cancel": "onClose"
  },

  onCreate: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:created", attributes)
  },

  onDelete: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:deleted", attributes)
  },

  onClose: function() {
    this.close();
  },

  onSave: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:saved", attributes)
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

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
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