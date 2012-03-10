$(function() {

  var export_pdf =  Ext.create('Ext.Button', {id: "btn_export_pdf", text: "Export PDF"    });

  var export_excel = Ext.create('Ext.Button', {id: "btn_export_excel", text: "Export Excel"    });

  var save_button = Ext.create('Ext.Button', {id: "btn_save_report", text: "Save Report"    });

  var toolbar = {xtype: 'toolbar', items: [save_button, export_excel, export_pdf]};

  Ext.define('Gowane.Widgets.Reports.Results', {
    extend: 'Ext.tab.Panel',
    collapsible: false,
    closable: false,
    alias: 'widget.reports_results',
    bodyStyle: 'padding: 5px',
    flex: 1,
    dockedItems: [toolbar],
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield'
  });
});