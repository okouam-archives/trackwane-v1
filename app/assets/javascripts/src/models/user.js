Ext.define('Gowane.models.User', {
  extend: 'Ext.data.Model',
  fields: ['id', 'account_id', 'email', 'last_login_at', 'login', 'last_login_ip', 'is_active', 'created_at'],
  proxy: {
    type: 'ajax',
    url: '/users.json',
    reader: {
      type: 'json',
      root: 'results'
    }
  }
});

