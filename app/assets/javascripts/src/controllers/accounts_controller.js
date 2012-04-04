App.Controllers.AccountsController = App.Controllers.Base.extend({

  appEvents: {
    "accounts:fetched": "onAccountsFetched",
    "editor:closed": "onEditorClosed",
    "account:selected": "onAccountSelected",
    "account:created": "onAccountCreated",
    "account:saved": "onAccountSaved",
    "account:deleted": "onAccountDeleted"
  },

  events: {
    "click .new_account": "onNewAccount"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new App.Views.Accounts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Accounts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    new App.Collections.Accounts().fetch({success: function(results) {
        this.pubsub.trigger("accounts:fetched", results);
      }.bind(this)
    });
  },

  onAccountsFetched: function(accounts) {
    this.accounts = accounts;
    this.listing.render(accounts);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onAccountSelected: function(account_id) {
    var account = this.accounts.get(account_id);
    this.editor.render(account);
  },

  onAccountCreated: function(attributes) {
    var account = new App.Models.Account(attributes);
    account.save(null, {success: function(model) {
        this.Accounts.add(model);
        this.pubsub.trigger("accounts:fetched", this.accounts);
        this.editor.close();
      }.bind(this)
    });
  },

  onNewAccount: function() {
    this.editor.render({});
  },

  onAccountSaved: function(attributes) {
    var account = this.accounts.get(attributes.id);
    account.save(attributes, {success: function(model) {
        this.pubsub.trigger("accounts:fetched", this.accounts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAccountDeleted: function(account_id) {
    var account = this.accounts.get(account_id);
    this.accounts.remove(account);
    account.destroy();
    this.editor.close();
    this.listing.render(this.accounts);
  }

});
