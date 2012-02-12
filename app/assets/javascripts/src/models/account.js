Ext.define('Gowane.models.Account', {
  extend: 'Ext.data.Model',
  fields: ['id', 'name', 'telephone', 'contact', 'email'],
  proxy: {
    type: 'rest',
    url: '/accounts',
    format: 'json',
    reader: {
      type: 'json',
      root: 'results'
    }
  }
});

