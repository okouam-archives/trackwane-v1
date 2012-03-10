Ext.define('Gowane.models.Event', {
  extend: 'Ext.data.Model',
  fields: ['address', 'alarm_id', 'date', 'device_id', 'gps_signal', 'heading', 'id', 'imei_number', 'latitude',
    'speed', 'longitude', 'status_code', 'warnings'],
  proxy: {
    extraParams: {},
    type: 'rest',
    format: 'json',
    url: '/events',
    reader: {
      type: 'json',
      root: 'results',
      totalProperty: 'total'
    }
  }
});