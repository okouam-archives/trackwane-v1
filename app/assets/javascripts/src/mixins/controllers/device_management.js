Ext.define('Gowane.Mixins.Controllers.DeviceManagement', {

  saveDevice: function(form, store, account_id) {
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = store.add(form.getFieldValues())[0];
        record.set("account_id", account_id);
      } else {
        form.updateRecord(record);
      }
      record.save({callback: function() {
        record.commit();
      }});
    }
  },

  deleteDevice: function(device) {
    var store = device.store;
    store.remove(device);
    store.sync();
  }

});