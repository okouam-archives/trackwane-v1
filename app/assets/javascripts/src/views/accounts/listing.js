Trackwane.Views.Accounts.Listing = Trackwane.Views.Base.extend({

  events: {
    "click tr td.selectable" : "onAccountSelect",
    "click button.save": "onAccountSave",
    "click .remove": "onAccountDelete",
    "click button.create": "onAccountCreate"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
    $(window).resize(this.onResize.bind(this));
  },

  resize: function() {
    var window_height = $(window).height();
    var original_height = this.$el.height();
    var max_height = window_height - 90;
    if (original_height > max_height) this.$el.height(max_height);
    else this.$el.height("auto");
    $('.lionbars').lionbars();
  },

  onResize: function() {
    this.render(this.users);
  },

  onAccountSave: function() {
    this.pubsub.trigger("account:saved");
  },

  onAccountDelete: function(evt) {
    if (confirm($.t("confirmation_accounts.delete"))) {
      var id = $(evt.currentTarget).parents("tr").data("id");
      this.pubsub.trigger("account:deleted", id);
    }
  },

  onAccountSelect: function(evt) {
    var id = $(evt.currentTarget).parent("tr").data("id");
    this.pubsub.trigger("account:selected", id);
  },

  onAccountCreate: function() {
    this.pubsub.trigger("account:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(accounts) {
    this.accounts = accounts;
    this.$el.html(this.template(accounts));
    this.$el.show();
    this.resize();
  }

}); 
