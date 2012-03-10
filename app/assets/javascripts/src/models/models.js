$(function() {

  Ext.define('Gowane.models.SpeedAlarm', {
    extend: 'Ext.data.Model',
    fields: ['id', 'speed', 'name', 'medium', 'recipient'],
    proxy: {type: 'rest', format: 'json', url: '/alarms', extraParams: {type: 'speed'}, reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.GeofenceAlarm', {
    extend: 'Ext.data.Model',
    fields: ['id', 'type', 'name', 'medium', 'geofence', 'recipient'],
    proxy: {type: 'rest', format: 'json', url: '/alarms', extraParams: {type: 'geofence'}, reader: {type: 'json', root: 'results'}}
  });

  Ext.define('Gowane.models.Group', {
    extend: 'Ext.data.Model',
    fields: ['account_id', 'device_count', 'name', 'id'],
    proxy: {type: 'rest', format: 'json', url: '/groups', reader: {type: 'json', root: 'results'}}
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
