App.Views.FollowActionPanel = Backbone.View.extend({

  destroy: function() {

  },

  render: function() {
    var template = Handlebars.compile($("#follow-panel-template").html());
    this.$el.html(template);
  }

});