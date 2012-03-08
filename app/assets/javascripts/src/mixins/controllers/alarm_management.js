Ext.define('Gowane.Mixins.Controllers.AlarmManagement', {

  selectAlarm: function(selection) {
    this.selected_alarm = selection;
  },

  saveGeofenceAlarm: function(form, store) {
    this.saveAlarm(form, store)
  },

  saveAlarm: function(form, store) {
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = store.add(form.getFieldValues())[0];
      } else {
        form.updateRecord(record);
      }
      record.save();
    }
  },

  saveSpeedAlarm: function(form, store) {
    this.saveAlarm(form, store)
  },

  deleteAlarm: function(alarm) {
    var store = alarm.store;
    store.remove(alarm);
    store.sync();
  }

});