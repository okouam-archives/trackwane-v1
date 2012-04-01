App.Controllers.UsersController = App.Controllers.Base.extend({

  appEvents: {
    "users:fetched": "onUsersFetched",
    "editor:closed": "onEditorClosed",
    "user:selected": "onUserSelected",
    "user:created": "onUserCreated",
    "user:saved": "onUserSaved",
    "user:deleted": "onUserDeleted"
  },

  events: {
    "click .new_user": "onNewUser"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new App.Views.Users.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new App.Views.Users.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new App.Views.Users.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    new App.Collections.Users().fetch({success: function(results) {
        this.pubsub.trigger("users:fetched", results);
      }.bind(this)
    });
  },

  onUsersFetched: function(users) {
    this.users = users;
    this.listing.render(users);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onUserSelected: function(user_id) {
    var user = this.users.get(user_id);
    this.editor.render(user);
  },

  onUserCreated: function(attributes) {
    var user = new App.Models.User(attributes);
    user.save(null, {success: function(model) {
        this.users.add(model);
        this.pubsub.trigger("users:fetched", this.users);
        this.editor.close();
      }.bind(this)
    });
  },

  onNewUser: function() {
    this.editor.render({});
  },

  onUserSaved: function(attributes) {
    var user = this.users.get(attributes.id);
    user.save(attributes, {success: function(model) {
        this.pubsub.trigger("users:fetched", this.users);
        this.editor.close();
      }.bind(this)
    });
  },

  onUserDeleted: function(user_id) {
    var user = this.users.get(user_id);
    this.users.remove(user);
    user.destroy();
    this.editor.close();
    this.listing.render(this.users);
  }

});
