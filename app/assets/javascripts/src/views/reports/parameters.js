App.Views.Reports.Parameters = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  getParameters: function() {
    var type = $("select.type").val();
    var date = $("input.datepicker").val();
    var period = $("select.period").val();
    return {type: type, date: date, period: period};
  },

  render: function() {
    var source = $("#parameters-template").html();
    var template = Handlebars.compile(source);
    $(template()).appendTo(this.$el);
  }

});