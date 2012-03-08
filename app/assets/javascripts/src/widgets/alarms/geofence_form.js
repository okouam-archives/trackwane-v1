$(function() {

  Ext.define('Gowane.Widgets.Alarms.GeofenceForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.geofence_form',
    collapsible: false,
    closable: false,
    bodyStyle: 'padding: 5px',
    flex: 1,
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield',
    items: [{fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'}]
  });

});

