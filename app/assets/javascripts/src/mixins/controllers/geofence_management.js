Ext.define('Gowane.Mixins.Controllers.GeofenceManagement', {

  selectGeofence: function(selection, map) {
    this.selected_geofence = selection;
    map.showGeofences([selection.get("coordinates")]);
  },

  deleteGeofence: function(geofence) {
    var store = geofence.store;
    store.remove(geofence);
    store.sync();
  },

  saveGeofence: function(form, store, map) {
    var isSuccess = false;
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = store.add(form.getFieldValues())[0];
        record.set("coordinates", map.retrieveGeofenceCoordinates());
      } else {
        form.updateRecord(record);
      }
      record.save();
      isSuccess = true;
    }
    return isSuccess;
  }

});