App.Views.Reports.Parameters = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  getParameters: function() {

  },

  render: function() {
    var source = $("#parameters-template").html();
    var template = Handlebars.compile(source);
    $(template()).appendTo(this.$el);
  }

});