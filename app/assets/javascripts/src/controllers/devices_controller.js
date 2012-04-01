App.Controllers.DevicesController = App.Controllers.Base.extend({

  appEvents: {
    "devices:fetched": "onDevicesFetched",
    "editor:closed": "onEditorClosed",
    "device:selected": "onDeviceSelected",
    "device:creating": "onDeviceCreating",
    "device:created": "onDeviceCreated",
    "device:saved": "onDeviceSaved",
    "device:deleted": "onDeviceDeleted"
  },

  events: {
    "click .new_device": "onNewDevice"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new App.Views.Devices.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Devices.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new App.Views.Devices.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    new App.Collections.Devices().fetch({success: function(results) {
        this.pubsub.trigger("devices:fetched", results);
      }.bind(this)
    });
  },

  onNewDevice: function() {
    this.editor.render({});
  },

  onDevicesFetched: function(devices) {
    this.devices = devices;
    this.listing.render(devices);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onDeviceSelected: function(device_id) {
    var device = this.devices.get(device_id);
    this.editor.render(device);
  },

  onDeviceCreated: function(attributes) {
    var device = new App.Models.Device(attributes);
    device.save(null, {success: function(model) {
        this.devices.add(model);
        this.pubsub.trigger("devices:fetched", this.devices);
        this.editor.close();
      }.bind(this)
    });
  },

  onDeviceCreating: function() {
    this.editor.render({});
  },

  onDeviceSaved: function(attributes) {
    var device = this.devices.get(attributes.id);
    device.save(attributes, {success: function() {
        this.pubsub.trigger("devices:fetched", this.devices);
        this.editor.close();
      }.bind(this)
    });
  },

  onDeviceDeleted: function(device_id) {
    var device = this.devices.get(device_id);
    this.devices.remove(device);
    device.destroy();
    this.editor.close();
    this.listing.render(this.devices);
  }

});

