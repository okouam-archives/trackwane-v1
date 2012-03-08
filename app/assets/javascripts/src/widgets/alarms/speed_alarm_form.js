$(function() {

  var actionStore = [["email", "Email"], ["sms", "SMS"]];

  Ext.define('Gowane.Widgets.Alarms.SpeedAlarmForm', {
    extend: 'Ext.form.Panel',
    collapsible: false,
    closable: false,
    bodyStyle: 'padding: 5px',
    flex: 1,
    alias: 'widget.speed_alarm_form',
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield',
    items: [
      {fieldLabel: 'Speed', name: 'speed', width: 110, anchor: '-4'},
      {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
      {fieldLabel: 'Medium', store: actionStore, width: 110, queryMode: 'local', anchor: '-4',
        valueField: 'id', name: 'medium', displayField: 'name', xtype: 'combobox', forceSelection: true},
      {fieldLabel: 'Recipient', store: Ext.getStore('UserStore'), width: 110, queryMode: 'local', anchor: '-4',
        valueField: 'id', name: 'recipient', displayField: 'login', xtype: 'combobox', forceSelection: true}
    ]
  });

});
