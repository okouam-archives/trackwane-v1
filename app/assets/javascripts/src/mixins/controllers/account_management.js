Ext.define('Gowane.Mixins.Controllers.AccountManagement', {

  saveAccount: function(form, store) {
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = store.add(form.getFieldValues())[0];
      } else {
        form.updateRecord(record);
      }
      record.save({callback: function() {
        record.commit();
      }});
    }
  },

  deleteAccount: function(account) {
    var store = account.store;
    store.remove(account);
    store.sync();
  }

});