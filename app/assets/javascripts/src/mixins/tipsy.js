Ext.define('Gowane.Mixins.Tipsy', {

  hideTipsy: function (immediate) {
    window["cancel.tipsy"] = false;
    $("body").css({cursor: "default"});
    if (immediate) {
      this.removeTipsy();
			$("body").css("cursor", "auto");
    } else {
      setTimeout(function() {
        this.removeTipsy();
				$("body").css("cursor", "auto");
      }.bind(this), 100);
    }
  },

  removeTipsy: function() {
    if (window["cancel.tipsy"] || !window["active.tipsy"]) return;
    var tip = window["active.tipsy"];
    tip.remove();
  },

  showTipsy: function(feature, callback){
    var coords = feature.layer.getViewPortPxFromLonLat(feature.geometry.bounds.getCenterLonLat());
    window["cancel.tipsy"] = true;
    var widthOffset = ($(document).width() - 1300) / 2;
    var tip = window["active.tipsy"];
    if (!tip) tip = this.createTipsy();
    var popupHtml = callback(feature.attributes);
    tip.find('.tipsy-inner')['html'](popupHtml);
    var pos = {top: coords.y + 20, left: coords.x + widthOffset, width: 24, height: 24};
    tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
    var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
    tip.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-south');
    tip.css({visibility: 'visible'});
		$("body").css("cursor", "pointer");
  },

  createTipsy: function() {
    tip = $('<div class="tipsy"><div class="tipsy-inner"/></div>');
    tip.css({position: 'absolute', zIndex: 100000});
    window["active.tipsy"] = tip;
    return tip;
  },

	showLabels: function(features) {
		this.labels = [];
		var widthOffset = ($(document).width() - 1255) / 2;
		_.each(features, function(feature) {
			var coords = feature.layer.getViewPortPxFromLonLat(feature.geometry.bounds.getCenterLonLat());
			var event_id = feature.attributes["event_id"];
			var is_warning = feature.attributes["warning"];
			var label = this.createLabel(event_id, is_warning);
			this.labels.push(label);
			var pos = {top: coords.y + 43, left: coords.x + widthOffset, width: 24, height: 24};
			label.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(document.body);
			var actualWidth = label[0].offsetWidth, actualHeight = label[0].offsetHeight;
			label.css({top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}).addClass('tipsy-west');
			label.css({visibility: 'visible'});
		}.bind(this));
	},

	hideLabels: function() {
		if (this.labels) {
			_.each(this.labels, function(label) {
				label.remove();
			})
		}
	},

	createLabel: function(event_id, is_warning) {
		var color = is_warning ? "red" : "white";
    return $('<div style="position: absolute; z-index: 100000" class="tipsy"><div style="color: ' + color + '; font-size: 10px; padding: 2px 5px 2px" class="tipsy-inner"><b>' + event_id + '</b></div></div>');
	}
});
