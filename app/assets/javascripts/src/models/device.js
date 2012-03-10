Ext.define('Gowane.models.Device', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'imei_number', 'display_name', 'id', 'group_name'],
  proxy: {type: 'rest', format: 'json', url: '/devices', reader: {type: 'json', root: 'results'}}
});