Ext.define('Gowane.stores.Accounts', {
  model: 'Gowane.models.Account', extend: 'Ext.data.Store', requires: 'Gowane.models.Account'
});

Ext.define('Gowane.stores.Groups', {
  model: 'Gowane.models.Group', extend: 'Ext.data.Store', requires: 'Gowane.models.Group'
});

Ext.define('Gowane.stores.GpsEvents', {
  model: 'Gowane.models.GpsEvent', extend: 'Ext.data.Store', requires: 'Gowane.models.GpsEvent'
});

Ext.define('Gowane.stores.StopEvents', {
  model: 'Gowane.models.StopEvent', extend: 'Ext.data.Store', requires: 'Gowane.models.StopEvent'
});

Ext.define('Gowane.stores.DistanceEvents', {
  model: 'Gowane.models.DistanceEvent', extend: 'Ext.data.Store', requires: 'Gowane.models.DistanceEvent'
});

Ext.define('Gowane.stores.Geofences', {
  model: 'Gowane.models.Geofence',    extend: 'Ext.data.Store',       requires: 'Gowane.models.Geofence'
});

Ext.define('Gowane.stores.Places', {
  model: 'Gowane.models.Place',     extend: 'Ext.data.Store',   requires: 'Gowane.models.Place'
});

Ext.define('Gowane.stores.Devices', {
  model: 'Gowane.models.Device',         extend: 'Ext.data.Store',           requires: 'Gowane.models.Device'
});

Ext.define('Gowane.stores.Users', {
  model: 'Gowane.models.User',         extend: 'Ext.data.Store',        requires: 'Gowane.models.User'
});

Ext.define('Gowane.stores.Alarms', {
  model: 'Gowane.models.Alarm',         extend: 'Ext.data.Store',        requires: 'Gowane.models.Alarm'
});