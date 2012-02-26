$(function() {

  Ext.define('Gowane.Widgets.ReportBuilder', {
    extend: 'Ext.form.Panel',
    alias: 'widget.report_builder',
    bodyBorder: false,
    bodyPadding: '10 10 10 10',
    title: 'Parameters',
    items: [
      { xtype: 'combo',
        id: 'reportType',
        typeAhead: true,
        queryMode: 'local',
        store: 'ReportTypeStore',
        valueField: 'type',
        displayField: 'name',
        fieldLabel: 'Type'
      },
      {
        xtype: 'datefield',
        id: 'fromDay',
        fieldLabel: 'From',
        name: 'fromDay'
      },
      {
        xtype: 'datefield',
        id: 'toDay',
        fieldLabel: 'To',
        name: 'toDay'
      }
    ]
  });

});

