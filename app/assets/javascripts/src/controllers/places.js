Ext.define('Gowane.controllers.Places', {

  extend: 'Gowane.controllers.AbstractController',

  onLaunch: function() {
    this.callParent();
    this.pubsub = _.extend({}, Backbone.Events);
    this.map = new App.Views.PlacesMap({el: "#map", pubsub: this.pubsub});
    this.index = new App.Views.Places({el: "#map", pubsub: this.pubsub});
    var places = new App.Collections.Places();
    this.map.render();
    places.fetch({success: function(results) {
      this.pubsub.trigger("places:received", results);
    }.bind(this)});
  }

});

