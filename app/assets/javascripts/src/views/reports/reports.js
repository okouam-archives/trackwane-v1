Trackwane.Views.Reports.Reports = Backbone.View.extend({

  events: {
    "click a.remove": "onDeleteReport",
    "click a.show": "onShowReport"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#reports-template").html();
    this.template = Handlebars.compile(source);
    $(window).resize(this.onResize.bind(this));
  },

  onDeleteReport: function(evt) {
    if (confirm("Are you sure you want to delete this report?")) {
      var id = $(evt.currentTarget).data("id");
      this.pubsub.trigger("report:delete", id);
    }
  },

  onShowReport: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("report:show", id);
  },

  onResize: function() {
    var window_height = $(window).height();
    this.$el.height(window_height - 392);
    $('.lionbars').lionbars();
  },

  render: function(reports) {
    this.$el.show();
    this.$el.html(this.template(reports));
    this.onResize();
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  }

});