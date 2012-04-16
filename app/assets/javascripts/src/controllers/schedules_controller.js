Trackwane.Controllers.SchedulesController = Trackwane.Controllers.Base.extend({

  appEvents: {
    "schedules:fetched": "onSchedulesFetched",
    "editor:closed": "onEditorClosed",
    "schedule:selected": "onScheduleSelected",
    "schedule:created": "onScheduleCreated",
    "schedule:saved": "onScheduleSaved",
    "schedule:deleted": "onScheduleDeleted"
  },

  events: {
    "click .new-schedule": "onNewSchedule"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new Trackwane.Views.Schedules.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Schedules.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new Trackwane.Views.Schedules.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    new Trackwane.Collections.Schedules().fetch({success: function(results) {
        this.pubsub.trigger("schedules:fetched", results);
      }.bind(this)
    });
  },

  onSchedulesFetched: function(schedules) {
    this.schedules = schedules;
    this.listing.render(schedules);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onScheduleSelected: function(device_id) {
    var schedule = this.schedules.get(device_id);
    this.editor.render(schedule);
  },

  onScheduleCreated: function(attributes) {
    var schedule = new Trackwane.Models.Schedule(attributes);
    schedule.save(null, {success: function(model) {
        this.schedules.add(model);
        this.pubsub.trigger("schedules:fetched", this.schedules);
        this.editor.close();
      }.bind(this)
    });
  },

  onNewSchedule: function() {
    this.editor.render({});
  },

  onScheduleSaved: function(attributes) {
    var schedule = this.schedules.get(attributes.id);
    schedule.save(attributes, {success: function() {
        this.pubsub.trigger("schedules:fetched", this.schedules);
        this.editor.close();
      }.bind(this)
    });
  },

  onScheduleDeleted: function(device_id) {
    var schedule = this.schedules.get(device_id);
    this.schedules.remove(device);
    schedule.destroy();
    this.editor.close();
    this.listing.render(this.schedules);
  }

});

