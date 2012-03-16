App.Views.SendCommandActionPanel = Backbone.View.extend({

  destroy: function() {

  },

  render: function() {
    var template = Handlebars.compile($("#send-command-panel-template").html());
    this.$el.html(template);
  }

});