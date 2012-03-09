$(function() {

  var alarmTypeStore = new Ext.data.ArrayStore({
     fields: ['abbr', 'state'],
     data : [['1', 'hello'],['2', 'hi'],['3', 'bye']]
  });

  Ext.define('Gowane.Widgets.Alarms.GeofenceAlarmForm', {
    extend: 'Ext.form.Panel',
    collapsible: false,
    closable: false,
    bodyStyle: 'padding: 5px',
    flex: 1,
    align: 'stretchmax',
    width: '100%',
    alias: 'widget.geofence_alarm_form',
    defaultType: 'textfield',
    items: [
      {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
      {fieldLabel: 'Type', store: alarmTypeStore, width: 110, queryMode: 'local', anchor: '-4',
        valueField: 'id', xtype: 'combobox', forceSelection: true},
      {fieldLabel: 'Geofence', store: Ext.getStore('GeofenceStore'), width: 110, queryMode: 'local',
        anchor: '-4', valueField: 'id', name: 'rule', displayField: 'name', xtype: 'combobox', forceSelection: true
      }
    ]
  });

});
