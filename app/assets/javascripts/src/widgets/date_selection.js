$(function() {

  Ext.define('Gowane.Widgets.DateSelection', {
    extend: 'Ext.form.Panel',
    alias: "widget.date_selection",
    bodyPadding: 10,
    defaultType: 'textfield',
    title: "Periode",
    items: [
      {
        xtype: 'datefield',
        fieldLabel: 'Debut',
        name: 'fromDay',
        id: 'fromDay'
      },
      {
        id: 'toDay',
        xtype: 'datefield',
        fieldLabel: 'Fin',
        name: 'toDay'
      }
    ]
  });

});