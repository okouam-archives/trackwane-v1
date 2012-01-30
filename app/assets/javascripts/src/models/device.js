Ext.define('Gowane.models.Device', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'imei_number', 'display_name'],
  proxy: {
    type: 'ajax',
    url: '/devices',
    reader: {
      type: 'json',
      root: 'results'
    }
  }
});

