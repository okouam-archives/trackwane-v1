$(function() {

  Ext.define('Gowane.models.Account', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'telephone', 'contact', 'email', 'devices_count', 'alarms_count', 'users_count',
    'geofences_count', 'places_count'],
    proxy: {type: 'rest', format: 'json', url: '/accounts', reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.GpsEvent', {
    extend: 'Ext.data.Model',
    fields: ['address', 'alarm_id', 'date', 'device_id', 'gps_signal', 'heading', 'id', 'imei_number', 'latitude',
      'speed', 'longitude', 'status_code', 'warnings'],
    proxy: {
			extraParams: {},
			type: 'rest',
			format: 'json', url: '/events', reader: {type: 'json', root: 'results', totalProperty: 'total'}}
  });

  Ext.define('Gowane.models.StopEvent', {
    extend: 'Ext.data.Model',
    fields: [],
    proxy: {type: 'rest', format: 'json', url: '/events', reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.SpeedEvent', {
    extend: 'Ext.data.Model',
    fields: ['date', 'device', 'speed', 'device_id'],
    proxy: {type: 'rest', format: 'json', url: '/events', reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.DistanceEvent', {
    extend: 'Ext.data.Model',
    fields: ['date', 'device', 'distance', 'device_id'],
    proxy: {type: 'rest', format: 'json', url: '/events', reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.Alarm', {
    extend: 'Ext.data.Model',
    fields: ['id', 'category', 'name', 'medium', 'rule', 'recipient'],
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

  Ext.define('Gowane.models.Report', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'devices', 'from', 'to', 'daterange', 'measure'],
    proxy: {type: 'rest', format: 'json', url: '/reports', reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.User', {
    extend: 'Ext.data.Model',
    fields: ['id', 'account_id', 'email', 'last_login_at', 'login', 'last_login_ip', 'is_active', 'created_at'],
    proxy: {type: 'rest', format: 'json', url: '/users', reader: {type: 'json', root: 'results'}}
  });

});
