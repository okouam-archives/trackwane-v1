Ext.define('Gowane.models.Geofence', {
  extend: 'Ext.data.Model',
  fields: ['name', 'coordinates'],
  proxy: {
    type: 'ajax',
    url: '/geofences',
    reader: {
      type: 'json',
      root: 'results'
    }
  }
});

