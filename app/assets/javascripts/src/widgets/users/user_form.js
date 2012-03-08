$(function() {
  Ext.define('Gowane.Widgets.UserForm', {
    extend: 'Ext.form.Panel',
    collapsible: false,
    closable: false,
    alias: 'widget.user_form',
    bodyStyle: 'padding: 5px',
    flex: 1,
    align: 'stretchmax',
    width: '100%',
    defaultType: 'textfield',
    items: [
      {fieldLabel: 'Nom', name: 'login'},
      {fieldLabel: 'Role', name: 'role'},
      {fieldLabel: 'Adresse Electronique', name: 'email'},
      {fieldLabel: 'Mot de Passe', name: 'password'},
      {fieldLabel: 'Status', name: 'status'}
    ]
  });
});