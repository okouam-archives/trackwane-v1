Ext.define('Gowane.Mixins.Controllers.PlaceVisualization', {

  togglePlaces: function(action, map) {
    if (action == 'hide') this.hideGeofences(map);
    else this.showGeofences(map);
  },

  hidePlaces: function(map) {
    map.hidePlaces();
  },

  showPlaces: function(map) {
    var places = new $.App.Collections.Places();
    places.fetch(function(collection) {
      map.showPlaces(collection);
    });
  }

});