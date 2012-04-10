App.Controllers.RealtimeController = App.Controllers.Base.extend({

  appEvents: {
    "event:selected":         "onEventSelected",
    "events:received":        "onEventsReceived",
    "panel:closing":          "onPanelClosing",
    "action:send-command":    "onSendCommandAction",
    "action:follow":          "onFollowAction",
    "places:toggle":          "onTogglePlaces",
    "geofence-alarms:toggle": "onToggleGeofences",
    "command:sent":           "onCommandSent"
  },

  initialize: function(options) {
    this.init(options);
    setInterval(this.poll.bind(this), 20000);
    this.listing = new App.Views.Realtime.Events({el: "#canvas .listing", pubsub: this.pubsub});
    this.toolbar = new App.Views.Realtime.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.follow_panel = new App.Views.Realtime.FollowActionPanel({el: "#canvas .follow.panel", pubsub: this.pubsub});
    this.command_panel = new App.Views.Realtime.SendCommandActionPanel({el: "#canvas .send-command.panel", pubsub: this.pubsub});
    this.map = new App.Views.Realtime.Map({el: "#map", pubsub: this.pubsub});
    this.map.render();
    this.onEventsReceived(new App.Collections.RealtimeEvents(options.events));
  },

  onToggleGeofences: function() {
    if (this.showing_geofences) {
      this.map.hideGeofences();
      this.showing_geofences = false;
    } else {
      new App.Collections.GeofenceAlarms().fetch({success: function(results) {
        this.map.showGeofences(results);
        this.showing_geofences = true;
        }.bind(this)
      });
    }
  },

  onTogglePlaces: function() {
    if (this.showing_places) {
      this.map.hidePlaces();
      this.showing_places = false;
    } else {
      new App.Collections.Places().fetch({success: function(results) {
        this.map.showPlaces(results);
        this.showing_places = true;
        }.bind(this)
      });
    }
  },

  onEventsReceived: function(events) {
    this.listing.render(events);
    this.map.show(events);
  },

  onEventSelected: function(event_id) {
    this.hidePanels();
    this.map.center(event_id);
    this.follow_panel.render();
  },

  onSendCommandAction: function(event_id, device_name, msg) {
    this.hidePanels();
    this.command_panel.render({response: msg, event_id: event_id, device_name: device_name});
  },

  onCommandSent: function(event_id, command) {
    this.communicateWithDevice(event_id, function(response) {
      var device_name = response.device_name;
      var msg = response.msg;
      this.pubsub.trigger("action:send-command", event_id, device_name, msg);
    }.bind(this));
  },

  onFollowAction: function(event) {
    this.hidePanels();
    this.follow_panel.render(event);
  },

  onPanelClosing: function() {
    this.hidePanels();
  },

  hidePanels: function() {
    this.follow_panel.clear();
    this.command_panel.clear();
  },

  communicateWithDevice: function(event_id, callback) {
    callback({device_name: "TEST!!", msg: "FAKE RESPONSE"});
  },

  poll: function() {
    new App.Collections.RealtimeEvents().fetch({success: function(results) {
      this.pubsub.trigger("events:received", results);
    }.bind(this)});
  }

});

