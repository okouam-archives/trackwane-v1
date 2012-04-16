Trackwane.Controllers.HistoricalController = Trackwane.Controllers.Base.extend({

  appEvents: {
    "device:selected": "onDeviceSelected"
  },

  initialize: function(options) {
    this.init(options);
    this.devices_view = new Trackwane.Views.Historical.Devices({el: "#canvas .listing", pubsub: this.pubsub});
    this.map = new Trackwane.Views.Historical.Map({el: "#map", pubsub: this.pubsub});
    this.events_view =  new Trackwane.Views.Historical.Events({el: "#canvas .events", pubsub: this.pubsub});
    this.devices_view.render(new Trackwane.Collections.Devices(options.devices));
    this.datepicker = this.$el.find(".parameters input");
    this.datepicker.datepicker({ dateFormat: 'yy-mm-dd' });
    this.datepicker.datepicker('setDate', new Date());
  },

  onDeviceSelected: function(device_id) {
    new Trackwane.Collections.HistoricalEvents().fetch({
      data: {
        device_id: device_id,
        date: this.datepicker.val()
      },
      success: function(events) {
        this.events_view.render(events);
        this.map.render(events);
      }.bind(this)
    });
  }

});

