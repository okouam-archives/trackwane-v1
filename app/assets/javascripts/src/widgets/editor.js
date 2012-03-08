$(function() {

  Ext.define('Gowane.Widgets.Editor', {
    extend: 'Ext.panel.Panel',
    alias: "widget.editor",
    closable: false,
    fbar: [{text: 'Cancel', id: 'btn_cancel_changes'}, {text: 'Save', id: 'btn_accept_changes'}]
  });

});
