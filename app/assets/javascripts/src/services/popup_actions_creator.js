App.Services.PopupActionsCreator = function(map, template) {
  this.map = map;
  this.template = Handlebars.compile($(template).html());
};

_.extend(App.Services.PopupActionsCreator.prototype, {

  build: function(attributes, lonlat, tag) {
    var popup = new OpenLayers.Popup(attributes.name, lonlat, new OpenLayers.Size(10,10), this.template(attributes), true);
    popup.autoSize = true;
    popup.backgroundColor = 'transparent';
    popup.events.register('mouseover', null, function(evt) {
      $(evt.currentTarget).find(".actions").show();
    }.bind(this));
    popup.events.register('mouseout', null, function(evt) {
      $(evt.currentTarget).find(".actions").hide();
    }.bind(this));
    if (tag) popup.tag = tag;
    this.map.addPopup(popup);
    return popup;
  }

});

