Ext.define('Gowane.models.Geofence', {
  extend: 'Ext.data.Model',
  fields: ['name', 'coordinates'],
  proxy: {type: 'rest', format: 'json', url: '/geofences', reader: {type: 'json', root: 'results'}}
});

$.App.Models.Geofence = Backbone.Model.extend({

});