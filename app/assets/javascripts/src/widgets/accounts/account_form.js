$(function() {
  Ext.define('Gowane.Widgets.AccountForm', {
    collapsible: false,
    closable: false,
    extend: 'Ext.form.Panel',
    alias: 'widget.account_form',
    bodyStyle: 'padding: 5px',
    flex: 1,
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield',
    items: [
      {fieldLabel: 'ID', name: 'id', width: 30, anchor: '-4'},
      {fieldLabel: 'Societe', name: 'name', width: 110, anchor: '-4'},
      {fieldLabel: 'Contact', name: 'contact', width: 110, anchor: '-4'},
      {fieldLabel: 'Telephone', name: 'telephone', width: 110, anchor: '-4'},
      {fieldLabel: 'Messagerie Electronique', name: 'email', width: 110, anchor: '-4'}
    ]
  });
});