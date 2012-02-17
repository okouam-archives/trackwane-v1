Ext.define('Gowane.models.Account', {
  extend: 'Ext.data.Model',
  fields: ['id', 'name', 'telephone', 'contact', 'email'],
  proxy: {type: 'rest', format: 'json', url: '/accounts', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.GpsEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', format: 'json', url: '/events?type=gps', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.StopEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', format: 'json', url: '/events?type=stop', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.DistanceEvent', {
  extend: 'Ext.data.Model',
  fields: [],
  proxy: {type: 'rest', format: 'json', url: '/events?type=distance', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Alarm', {
  extend: 'Ext.data.Model',
  fields: ['id', 'category', 'name', 'action', 'rule', 'recipient'],
  proxy: {type: 'rest', format: 'json', url: '/alarms', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Device', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'imei_number', 'display_name', 'id', 'group_name'],
  proxy: {type: 'rest', format: 'json', url: '/devices', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Geofence', {
  extend: 'Ext.data.Model',
  fields: ['name', 'coordinates'],
  proxy: {type: 'rest', format: 'json', url: '/geofences', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Group', {
  extend: 'Ext.data.Model',
  fields: ['account_id', 'device_count', 'name', 'id'],
  proxy: {type: 'rest', format: 'json', url: '/groups', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.Place', {
  extend: 'Ext.data.Model',
  fields: ['name', 'category', 'longitude', 'latitude'],
  proxy: {type: 'rest', format: 'json', url: '/places', reader: {type: 'json', root: 'results'}}
});

Ext.define('Gowane.models.User', {
  extend: 'Ext.data.Model',
  fields: ['id', 'account_id', 'email', 'last_login_at', 'login', 'last_login_ip', 'is_active', 'created_at'],
  proxy: {type: 'rest', format: 'json', url: '/users', reader: {type: 'json', root: 'results'}}
});

