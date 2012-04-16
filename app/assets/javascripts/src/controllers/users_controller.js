Trackwane.Controllers.UsersController = Trackwane.Controllers.Base.extend({

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
    this.listing = new Trackwane.Views.Users.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Users.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.pubsub.trigger("users:fetched", new Trackwane.Collections.Users(options.users));
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
    var user = new Trackwane.Models.User(attributes);
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
    user.save(attributes, {success: function() {
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
