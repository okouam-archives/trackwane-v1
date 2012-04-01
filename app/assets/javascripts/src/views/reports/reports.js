App.Views.Reports.Reports = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#reports-template").html();
    this.template = Handlebars.compile(source);
    $(window).resize(this.onResize.bind(this));
  },

  onResize: function() {
    var window_height = $(window).height();
    this.$el.height(window_height - 392);
    $('.lionbars').lionbars();
  },

  render: function(reports) {
    this.$el.html(this.template(reports));
    this.onResize();
  },

  close: function() {
    this.$el.empty();
  }

});