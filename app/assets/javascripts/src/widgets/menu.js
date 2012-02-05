Ext.define('Gowane.Widgets.Menu', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.menu',
  border: false,
  tbar: [
    {text: 'Cartes', menu: [
      { text: 'Realtime',
        handler: function() {
          window.location = "/map/realtime";
        }
      },
      { text: 'Points of Interest',
        handler: function() {
          window.location = "/map/pois";
        }
      },
      { text: 'Historial',
        handler: function() {
          window.location = "/map/historical";
        }
      },
      { text: 'Geofences',
        handler: function() {
          window.location = "/map/geofences";
        }
      }
    ]},
    {text: 'Rapports', menu: []}
  ]
});