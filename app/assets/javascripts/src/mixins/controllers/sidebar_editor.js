Ext.define('Gowane.Mixins.Controllers.SidebarEditor', {

  showEditor: function(form, title) {
    var container = this.getDynamic();
    container.removeAll();
    container.add(Ext.widget('editor', {items: [form], title: title}));
  },

  showHelpSidebar: function(template) {
    var helpSidebar = Ext.widget('template_panel', {template: template});
    var container = this.getDynamic();
    container.removeAll();
    container.add(helpSidebar);
  },

  loadEditor: function(item, form_name) {
    var form = Ext.widget(form_name);
    form.loadRecord(item);
    this.showEditor(form, "Edit");
  },

  onAccountChange: function() {
    this.refreshListing();
  },

  onCancelChanges: function() {
    this.showHelpSidebar("#introduction-template")
  }

});