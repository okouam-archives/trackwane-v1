Ext.define('Gowane.views.places.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.placeseditor',
  collapsible: false,
  closable: true,
  bodyStyle: 'padding: 5px',
  flex: 1,
  align: 'stretchmax',
  defaultType: 'textfield',
  items: [
    {fieldLabel: 'Name', width: 110, anchor: '-4'},
    {fieldLabel: 'Category', width: 110, anchor: '-4'}
  ]
});