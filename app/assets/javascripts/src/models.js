Ext.define('Gowane.models.Account', {
  extend: 'Ext.data.Model',
  fields: ['id', 'name', 'telephone', 'contact', 'email'],
  proxy: {type: 'rest', url: '/accounts.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.GpsEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', url: '/events.json?type=gps', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.StopEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', url: '/events.json?type=stop', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.DistanceEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', url: '/events.json?type=distance', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Alarm', {
  extend: 'Ext.data.Model',
  fields: ['id', 'category', 'name', 'action', 'rule', 'recipient'],
  proxy: {type: 'rest', url: '/alarms.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Device', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'imei_number', 'display_name', 'id'],
  proxy: {type: 'rest', url: '/devices.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Geofence', {
  extend: 'Ext.data.Model',
  fields: ['name', 'coordinates'],
  proxy: {type: 'rest', url: '/geofences.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Group', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'device_count', 'name', 'id'],
  proxy: {type: 'rest', url: '/groups.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Place', {
  extend: 'Ext.data.Model',
  fields: ['name', 'category', 'longitude', 'latitude'],
  proxy: {type: 'rest', url: '/places.json', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.User', {
  extend: 'Ext.data.Model',
  fields: ['id', 'account_id', 'email', 'last_login_at', 'login', 'last_login_ip', 'is_active', 'created_at'],
  proxy: {type: 'rest', url: '/users.json', reader: {type: 'json', root: 'results'}}
});

