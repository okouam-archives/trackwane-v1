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
      {fieldLabel: 'Name', name: 'name', width: 110, anchor: '-4'},
      {fieldLabel: 'Speed', name: 'speed', width: 110, anchor: '-4'}
    ]
  });

});
