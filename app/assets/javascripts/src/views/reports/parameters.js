App.Views.Reports.Parameters = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  close: function() {
    this.$el.hide();
  },

  getParameters: function() {
    var type = $("select.type").val();
    var date = $("input.datepicker").val();
    var period = $("select.period").val();
    return {type: type, date: date, period: period};
  },

  render: function() {
    this.$el.show();
    var source = $("#parameters-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template());
    $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    $(".datepicker").datepicker('setDate', new Date());
  }

});