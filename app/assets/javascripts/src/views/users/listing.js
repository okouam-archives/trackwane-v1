App.Views.Users.Listing = App.Views.Base.extend({

  events: {
    "click tr td.selectable" : "onUserSelect",
    "click button.save": "onUsereSave",
    "click button.delete": "onUserDelete",
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

  onUsereSave: function() {
    this.pubsub.trigger("user:saved");
  },

  onUserDelete: function() {
    this.pubsub.trigger("user:deleted");
  },

  onUserSelect: function(evt) {
    var id = $(evt.currentTarget).data("id");
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