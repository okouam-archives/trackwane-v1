App.Controllers.RealtimeController = App.Controllers.Base.extend({

  appEvents: {
    "event:selected":         "onEventSelected",
    "events:received":        "onEventsReceived",
    "panel:closing":          "onPanelClosing",
    "action:send-command":    "onSendCommandAction",
    "action:follow":          "onFollowAction",
    "places:toggle":          "onTogglePlaces",
    "geofence-alarms:toggle":       "onToggleGeofences"
  },

  initialize: function(options) {
    this.init(options);
    setInterval(this.poll.bind(this), 3000);
    this.listing = new App.Views.RealtimeEvents({el: "#canvas .listing", pubsub: this.pubsub});
    this.toolbar = new App.Views.Realtime.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.follow_panel = new App.Views.Realtime.FollowActionPanel({el: "#canvas .follow.panel", pubsub: this.pubsub});
    this.command_panel = new App.Views.Realtime.SendCommandActionPanel({el: "#canvas .send-action.panel", pubsub: this.pubsub});
    this.map = new App.Views.Realtime.Map({el: "#map", pubsub: this.pubsub});
    this.map.render();
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

  onSendCommandAction: function(event) {
    this.hidePanels();
    this.command_panel.render();
  },

  onFollowAction: function(event) {
    this.hidePanels();
    this.follow_panel.render();
  },

  onPanelClosing: function() {
    this.hidePanels();
  },

  hidePanels: function() {
    console.debug("hiding panels")
  },

  poll: function() {
    var events = new App.Collections.RealtimeEvents();
    events.fetch({success: function(results) {
      this.pubsub.trigger("events:received", results);
    }.bind(this)});
  }

});

