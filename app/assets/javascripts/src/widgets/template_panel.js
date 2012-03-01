$(function() {
  Ext.define('Gowane.Widgets.TemplatePanel', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.template_panel',

    constructor: function(cfg) {
      this.template = cfg.template;
      this.callParent(arguments);
      this.initConfig(cfg);
    },

    initComponent: function() {
      var source = $(this.template).html();
      var template = Handlebars.compile(source);
      this.html = template();
      this.callParent(arguments);
    }
  });
});