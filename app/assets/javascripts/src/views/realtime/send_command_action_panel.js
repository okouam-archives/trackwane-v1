App.Views.Realtime.SendCommandActionPanel = App.Views.Base.extend({

  initialize: function(options) {
    this.template = Handlebars.compile($("#send-command-panel-template").html());
    this.pubsub = options.pubsub;
  },

  render: function() {
    this.$el.html(this.template);
  }

});