Ext.define('Gowane.models.Device', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'imei_number', 'display_name', 'id'],
  proxy: {
    type: 'ajax',
    url: '/devices.json',
    reader: {
      type: 'json',
      root: 'results'
    }
  }
});

