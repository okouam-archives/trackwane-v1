Ext.define('Gowane.models.SpeedDataPoint', {
  extend: 'Ext.data.Model',
  fields: [
    {name: 'date', type: 'datetime'},
    {name: 'display_name', type: 'string'},
    {name: 'speed', type: 'int'}
  ],
  proxy: {
    extraParams: {},
    type: 'rest',
    format: 'json',
    url: '/reports/speed',
    reader: {
      type: 'json', root: 'results'
    }
  }
});