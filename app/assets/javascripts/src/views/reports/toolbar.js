Trackwane.Views.Reports.Toolbar = Backbone.View.extend({

  events: {
    "click .excel": "onExportExcel",
    "click .pdf": "onExportPdf",
    "click .toggle": "onTogglePresentation"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  onExportExcel: function() {
    this.pubsub.trigger("export:excel");
  },

  onExportPdf: function() {
    this.pubsub.trigger("export:pdf");
  },

  onTogglePresentation: function() {
    this.pubsub.trigger("presentation:toggle");
  }

});