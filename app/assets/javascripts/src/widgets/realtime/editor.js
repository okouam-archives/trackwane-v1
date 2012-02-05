Ext.define('Gowane.Widgets.Devices.Editor', {
  extend: 'Ext.form.Panel',
  alias: 'widget.realtimedeviceupdate',
  collapsible: false,
  closable: true,
  bodyStyle: 'padding: 5px',
  flex: 1,
  align: 'stretchmax',
  defaultType: 'textfield',
  items: [
    {fieldLabel: 'Longitude', width: 110, anchor: '-4'},
    {fieldLabel: 'Latitude', width: 110, anchor: '-4'},
    {fieldLabel: 'Status', width: 110, anchor: '-4'}
  ]
});