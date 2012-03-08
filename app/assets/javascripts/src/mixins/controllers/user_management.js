Ext.define('Gowane.Mixins.Controllers.UserManagement', {

  saveUser: function(form, store, account) {
    if (form.isValid()) {
      var record = form.getRecord();
      if (!record) {
        record = store.add(form.getFieldValues())[0];
        record.set("account_id", account.get("id"));
      } else {
        form.updateRecord(record);
      }
      record.save();
      component.close();
    }
  },

  deleteUser: function(user) {
    var store = user.store;
    store.remove(user);
    store.sync();
  }

});