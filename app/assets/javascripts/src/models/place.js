Ext.define('Gowane.models.Place', {
  extend: 'Ext.data.Model',
  fields: ['name', 'category', 'longitude', 'latitude'],
  proxy: {type: 'rest', format: 'json', url: '/places', reader: {type: 'json', root: 'results'}}
});
