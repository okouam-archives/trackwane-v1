$(function() {

  Ext.define('Gowane.Widgets.ReportBuilder', {
    extend: 'Ext.form.Panel',
    alias: 'widget.report_builder',
    padding: 10,
    items: [
      {
        xtype: 'datefield',
        fieldLabel: 'From',
        name: 'fromDay'
      },
      {
        xtype: 'datefield',
        fieldLabel: 'To',
        name: 'toDay'
      },
      {
        xtype      : 'fieldcontainer',
        fieldLabel : 'Size',
        defaultType: 'radiofield',
        defaults: {
            flex: 1
        },
        layout: 'hbox',
        items: [
            {
                boxLabel  : 'HTML',
                name      : 'size',
                inputValue: 'm',
                id        : 'radio1'
            }, {
                boxLabel  : 'PDF',
                name      : 'size',
                inputValue: 'l',
                id        : 'radio2'
            }, {
                boxLabel  : 'Excel',
                name      : 'size',
                inputValue: 'xl',
                id        : 'radio3'
            }]

      }
    ]
  });

});

