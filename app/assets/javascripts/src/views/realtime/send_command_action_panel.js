App.Views.Realtime.SendCommandActionPanel = App.Views.Base.extend({

  events: {
    "click button": "onSendCommand"
  },

  initialize: function(options) {
    this.template = Handlebars.compile($("#send-command-panel-template").html());
    this.pubsub = options.pubsub;
  },

  onSendCommand: function() {
    this.pubsub.trigger("command:sent", 3, "TEST MESSAGE");
  },

  clear: function() {
    this.$el.empty();
  },

  render: function(msg) {
    this.$el.html(this.template(msg));
  }

});