$(function() {

  Ext.define('Gowane.stores.Accounts', {
    model: 'Gowane.models.Account', extend: 'Ext.data.Store', requires: 'Gowane.models.Account'
  });

  Ext.define('Gowane.stores.Groups', {
    model: 'Gowane.models.Group', extend: 'Ext.data.Store', requires: 'Gowane.models.Group'
  });

  Ext.define('Gowane.stores.Events', {
    model: 'Gowane.models.Event', extend: 'Ext.data.Store', requires: 'Gowane.models.Event'
  });

  Ext.define('Gowane.stores.SpeedDataPoints', {
    model: 'Gowane.models.SpeedDataPoint', extend: 'Ext.data.Store', requires: 'Gowane.models.SpeedDataPoint'
  });

  Ext.define('Gowane.stores.Geofences', {
    model: 'Gowane.models.Geofence', extend: 'Ext.data.Store', requires: 'Gowane.models.Geofence'
  });

  Ext.define('Gowane.stores.Places', {
    model: 'Gowane.models.Place', extend: 'Ext.data.Store', groupField: 'category', requires: 'Gowane.models.Place'
  });

  Ext.define('Gowane.stores.Devices', {
    model: 'Gowane.models.Device', extend: 'Ext.data.Store', groupField: 'group_name', requires: 'Gowane.models.Device'
  });

  Ext.define('Gowane.stores.Users', {
    model: 'Gowane.models.User', extend: 'Ext.data.Store', requires: 'Gowane.models.User'
  });

  Ext.define('Gowane.stores.GeofenceAlarms', {
    model: 'Gowane.models.GeofenceAlarm', extend: 'Ext.data.Store', requires: 'Gowane.models.GeofenceAlarm'
  });

  Ext.define('Gowane.stores.SpeedAlarms', {
    model: 'Gowane.models.SpeedAlarm', extend: 'Ext.data.Store', requires: 'Gowane.models.SpeedAlarm'
  });

});