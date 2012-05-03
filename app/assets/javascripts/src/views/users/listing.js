Trackwane.Views.Users.Listing = Trackwane.Core.Framework.View.extend({

  events: {
    "click tr td.selectable" : "onUserSelect",
    "click button.save": "onUserSave",
    "click .remove": "onUserDelete",
    "click button.create": "onUserCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
    $(window).resize(this.onResize.bind(this));
  },

  resize: function() {
    var window_height = $(window).height();
    var original_height = this.$el.height();
    var max_height = window_height - 90;
    if (original_height > max_height) this.$el.height(max_height);
    else this.$el.height("auto");
    $('.lionbars').lionbars();
  },

  onResize: function() {
    this.render(this.users);
  },

  onUserSave: function() {
    this.pubsub.trigger("user:saved");
  },

  onUserDelete: function(evt) {
    if (confirm("Are you sure you want to delete this user?")) {
      var id = $(evt.currentTarget).parents("tr").data("id");
      this.pubsub.trigger("user:deleted", id);
    }
  },

  onUserSelect: function(evt) {
    var id = $(evt.currentTarget).parent("tr").data("id");
    this.pubsub.trigger("user:selected", id);
  },

  onUserCreate: function() {
    this.pubsub.trigger("user:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.users = users;
    this.$el.html(this.template(users));
    this.$el.show();
    this.resize();
  }

});