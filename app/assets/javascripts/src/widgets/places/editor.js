Ext.define('Gowane.Widges.Places.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.placeeditor',
  collapsible: false,
  closable: true,
  bodyStyle: 'padding: 5px',
  flex: 1,
  align: 'stretchmax',
  width: '100%',
  defaultType: 'textfield',
  items: [
    {fieldLabel: 'Name', width: 110, anchor: '-4'},
    {fieldLabel: 'Category', width: 110, anchor: '-4'}
  ]
});