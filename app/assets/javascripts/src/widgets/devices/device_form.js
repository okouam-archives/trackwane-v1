$(function() {
  Ext.define('Gowane.Widgets.DeviceForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.device_form',
    collapsible: false,
    closable: false,
    bodyStyle: 'padding: 5px',
    flex: 1,
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield',
    items: [
      {fieldLabel: 'Display Name', name: 'display_name', width: 110, anchor: '-4'},
      {fieldLabel: 'IMEI Number', name: 'imei_number', width: 110, anchor: '-4'}
    ]
  });
});