Ext.define('Gowane.models.Account', {
  extend: 'Ext.data.Model',
  fields: ['id', 'name', 'telephone', 'contact', 'email', 'devices_count', 'alarms_count', 'users_count',
  'geofences_count', 'places_count'],
  proxy: {type: 'rest', format: 'json', url: '/accounts', reader: {type: 'json', root: 'results'}}
});