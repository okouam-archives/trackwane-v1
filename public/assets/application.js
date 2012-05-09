(function() {

  window.Trackwane = {
    Collections: {},
    Controllers: {},
    Models: {},
    Core: {
      Controls: {},
      Extensions: {},
      Framework: {},
      Helpers: {},
      Traits: {}
    },
    Domain: {},
    Views: {
      Reports: {},
      Realtime: {
        Places: {},
        GeofenceAlarms: {},
        SpeedAlarms: {},
        Trackers: {}
      },
      Users: {},
      Accounts: {},
      Historical: {}
    }
  };

  $('.dropdown-toggle').dropdown;

  OpenLayers.ImgPath = '/assets/OpenLayers/';

  OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;

}).call(this);
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Array.prototype.remove = function(v) {
    return $.grep(this, function(e) {
      return e !== v;
    });
  };

  Trackwane.Logger = (function() {

    Logger.name = 'Logger';

    Logger.active = [];

    Logger.level = 0;

    function Logger(name) {
      this.name = name;
    }

    Logger.prototype.error = function() {
      return typeof console !== "undefined" && console !== null ? console.error(arguments) : void 0;
    };

    Logger.prototype.warn = function() {
      if (Trackwane.Logger.level > 1 && this.isActive(this.name)) {
        return typeof console !== "undefined" && console !== null ? console.warn(this.name, arguments) : void 0;
      }
    };

    Logger.prototype.info = function() {
      if (Trackwane.Logger.level > 0 && this.isActive(this.name)) {
        return typeof console !== "undefined" && console !== null ? console.info(this.name, arguments) : void 0;
      }
    };

    Logger.prototype.debug = function() {
      if (Trackwane.Logger.level > -1 && this.isActive(this.name)) {
        return typeof console !== "undefined" && console !== null ? console.debug(this.name, arguments) : void 0;
      }
    };

    Logger.prototype.isActive = function(name) {
      return __indexOf.call(Trackwane.Logger.active, name) >= 0;
    };

    Logger.get = function(name) {
      return new Trackwane.Logger(name);
    };

    Logger.on = function(name) {
      return Trackwane.Logger.active.push(name);
    };

    Logger.off = function(name) {
      if (this.isActive(name)) {
        return this.active = Trackwane.Logger.active.remove(name);
      }
    };

    return Logger;

  })();

  Trackwane.Logger.on("Services.Animator");

}).call(this);
(function() {

  if ($.translations == null) {
    $.translations = {};
  }

  $.translations["en"] = {
    validation: {
      accounts: {
        name: {
          required: "Please provide an account name",
          min_length: 'The account name must be a least {0} characters long'
        }
      },
      email: {
        bad_format: "Please provide a valid email address",
        required: "Please provide an email address"
      }
    },
    validation_alarm: {
      name_required: 'Please provide an alarm name',
      name_minlength: 'The alarm name must be a least {0} characters long',
      speed_required: 'Please provide a speed value',
      speed_digits: 'The speed value must be only digits'
    },
    validation_users: {
      login_required: 'Please provide a login',
      login_minlength: 'The login must be a least {0} characters long',
      password_required: 'Please provide a password',
      password_minlength: 'The password must be a least {0} characters long'
    },
    validation_devices: {
      display_name_required: 'Please provide a name for the device',
      display_name_minlength: 'The name of a device must be a least {0} characters long',
      imei_number_required: 'Please provide a IMEI number for the device',
      imei_number_minlength: 'The IMEI number of a device must be at least {0} digits long',
      imei_number_digits: 'The IMEI number must be only digits'
    },
    validation_places: {
      name_required: 'Please provide a place name',
      name_minlength: 'The place name must be a least {0} characters long',
      category_required: 'Please provide a category name',
      category_minlength: 'The category name must be a least {0} characters long.'
    },
    validation_schedules: {
      format_required: 'Please provide a format',
      format_minlength: 'The format must be a least {0} characters long'
    }
  };

}).call(this);
(function() {

  if ($.translations == null) {
    $.translations = {};
  }

  $.translations["fr"] = {
    validation: {
      accounts: {
        name: {
          required: "Veuillez entrer le nom du client",
          min_length: 'Le nom du client doit comprendre au moins {0} caractères'
        }
      },
      email: {
        bad_format: "Veuillez entrer une addresse email valide",
        required: "Veuillez entrer une addresse email"
      }
    },
    validation_alarm: {
      name_required: 'Veuillez donner un nom à cette alarme.',
      name_minlength: 'Le nom de cette alarme doit comprendre au moins {0} caractères.',
      speed_required: 'Veuillez donner une valeur pour la vitesse',
      speed_digits: 'La valeur de la vitesse doit contenir uniquement des chiffres'
    },
    validation_users: {
      login_required: 'Veuillez entrer un login',
      login_minlength: 'Le login doit comprendre au moins {0} caractères',
      password_required: 'Veuillez entrer un mot de passe',
      password_minlength: 'Le mot de passe doit comprendre au moins {0} caractères.'
    },
    validation_devices: {
      display_name_required: 'Veuillez donner un nom à cet véhicule.',
      display_name_minlength: 'Le nom du véhicule doit comprendre au moins {0} caractères',
      imei_number_required: 'Veuillez donner un numéro IMEI au véhicule',
      imei_number_minlength: 'Le numéro IMEI doit comprendre au moins {0} caractères',
      imei_number_digits: 'Le numéro IMEI doit contenir uniquement des chiffres'
    },
    validation_places: {
      name_required: "Veuillez entrez le nom du lieu",
      name_minlength: 'Le nom du lieu doit comprendre au moins {0} caractères.',
      category_required: "Please provide a category name",
      category_minlength: 'Le nom de la catégorie doit comprendre au moins {0} caractères.'
    },
    validation_schedules: {
      format_required: 'Veuillez donner un format',
      format_minlength: 'Le format doit comprendre au moins {0} caractères.'
    }
  };

}).call(this);
(function() {

  $.t = function(key) {
    var current, identifier, keys, _i, _len;
    keys = key.split('.');
    current = $.translations[$.locale];
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      identifier = keys[_i];
      current = current[identifier];
    }
    return current;
  };

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Account = (function(_super) {

    __extends(Account, _super);

    Account.name = 'Account';

    function Account() {
      return Account.__super__.constructor.apply(this, arguments);
    }

    Account.prototype.urlRoot = "/accounts";

    Account.validation_rules = {
      rules: {
        "account[name]": {
          required: true,
          minlength: "3"
        },
        "account[email]": {
          required: true,
          email: true
        }
      },
      messages: {
        "account[name]": {
          required: $.t("validation.accounts.name.required"),
          minlength: $.t("validation.accounts.name.min_length")
        },
        "account[email]": {
          required: $.t("validation.email.required"),
          email: $.t("validation.email.bad_format")
        }
      }
    };

    return Account;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Device = (function(_super) {

    __extends(Device, _super);

    Device.name = 'Device';

    function Device() {
      return Device.__super__.constructor.apply(this, arguments);
    }

    Device.prototype.urlRoot = "/devices";

    Device.validation_rules = {
      rules: {
        display_name: {
          required: true,
          minlength: "3"
        },
        imei_number: {
          required: true,
          minlength: 2,
          digits: true
        }
      },
      messages: {
        display_name: {
          required: $.t("validation_devices.display_name_required"),
          minlength: $.t("validation_devices.display_name_minlength")
        },
        imei_number: {
          required: $.t("validation_devices.imei_number_required"),
          minlength: $.t("validation_devices.imei_number_minlength"),
          digits: $.t("validation_devices.imei_number_digits")
        }
      }
    };

    return Device;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Event = (function(_super) {

    __extends(Event, _super);

    Event.name = 'Event';

    function Event() {
      return Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.getCoordinates = function() {
      var dest, lonlat, source;
      lonlat = new OpenLayers.LonLat(this.get("longitude"), this.get("latitude"));
      source = new OpenLayers.Projection("EPSG:4326");
      dest = new OpenLayers.Projection("EPSG:900913");
      return lonlat.transform(source, dest);
    };

    return Event;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.GeofenceAlarm = (function(_super) {

    __extends(GeofenceAlarm, _super);

    GeofenceAlarm.name = 'GeofenceAlarm';

    function GeofenceAlarm() {
      return GeofenceAlarm.__super__.constructor.apply(this, arguments);
    }

    GeofenceAlarm.prototype.urlRoot = "/geofence_alarms";

    GeofenceAlarm.validation_rules = {
      debug: true,
      rules: {
        "geofence_alarm[name]": {
          required: true,
          minlength: "3"
        }
      },
      messages: {
        "geofence_alarm[name]": {
          required: $.t("validation_alarm.name_required"),
          minlength: $.t("validation_alarm.name_minlength")
        }
      }
    };

    return GeofenceAlarm;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Place = (function(_super) {

    __extends(Place, _super);

    Place.name = 'Place';

    function Place() {
      return Place.__super__.constructor.apply(this, arguments);
    }

    Place.prototype.urlRoot = "/places";

    Place.prototype.initialize = function(attributes) {
      var feature, format;
      format = new OpenLayers.Format.WKT();
      feature = format.read(attributes.lonlat);
      return this.geometry = OpenLayers.Projection.transform(feature.geometry, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
    };

    Place.prototype.parse = function(response) {
      var feature, format;
      format = new OpenLayers.Format.WKT();
      feature = format.read(lonlat);
      response.geometry = OpenLayers.Projection.transform(feature.geometry, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      return response;
    };

    Place.prototype.toFeature = function() {
      var feature;
      feature = new OpenLayers.Feature.Vector(this.geometry, this.attributes);
      feature.style = {
        label: this.get("name"),
        labelOutlineColor: 'white',
        labelOutlineWidth: "4px",
        labelYOffset: 17,
        fontWeight: "bold",
        fontColor: "#084a8c",
        pointRadius: 6,
        externalGraphic: "/assets/default/layout/tab-close-on.gif"
      };
      feature.id = this.id;
      return feature;
    };

    Place.validation_rules = {
      debug: true,
      rules: {
        "place[name]": {
          required: true,
          minlength: "3"
        },
        "place[category]": {
          required: true,
          minlength: "3"
        }
      },
      messages: {
        "place[name]": {
          required: $.t("validation_places.name_required"),
          minlength: $.t("validation_places.name_minlength")
        },
        "place[category]": {
          required: $.t("validation_places.category_required"),
          minlength: $.t("validation_places.category_minlength")
        }
      }
    };

    return Place;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Report = (function(_super) {

    __extends(Report, _super);

    Report.name = 'Report';

    function Report() {
      return Report.__super__.constructor.apply(this, arguments);
    }

    Report.prototype.urlRoot = "/reports";

    return Report;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.Schedule = (function(_super) {

    __extends(Schedule, _super);

    Schedule.name = 'Schedule';

    function Schedule() {
      return Schedule.__super__.constructor.apply(this, arguments);
    }

    Schedule.prototype.urlRoot = "/schedules";

    Schedule.validation_rules = {
      rules: {
        "schedule[format]": {
          required: true,
          minlength: "3"
        },
        "schedule[email]": {
          required: true,
          email: true
        }
      },
      messages: {
        "schedule[format]": {
          required: $.t("validation_schedules.format_required"),
          minlength: $.t("validation_schedules.format_minlength")
        },
        "schedule[email]": {
          required: $.t("validation_schedules.email_required"),
          email: $.t("validation_schedules.email_format")
        }
      }
    };

    return Schedule;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.SpeedAlarm = (function(_super) {

    __extends(SpeedAlarm, _super);

    SpeedAlarm.name = 'SpeedAlarm';

    function SpeedAlarm() {
      return SpeedAlarm.__super__.constructor.apply(this, arguments);
    }

    SpeedAlarm.prototype.urlRoot = "/speed_alarms";

    SpeedAlarm.validation_rules = {
      rules: {
        "speed_alarm[name]": {
          required: true,
          minlength: "3"
        },
        "speed_alarm[speed]": {
          required: true,
          digits: true
        }
      },
      messages: {
        "speed_alarm[name]": {
          required: $.t("validation_alarm.name_required"),
          minlength: $.t("validation_alarm.name_minlength")
        },
        "speed_alarm[speed]": {
          required: $.t("validation_alarm.speed_required"),
          digits: $.t("validation_alarm.speed_digits")
        }
      }
    };

    return SpeedAlarm;

  })(Backbone.Model);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Models.User = (function(_super) {

    __extends(User, _super);

    User.name = 'User';

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.urlRoot = "/users";

    User.validation_rules = {
      debug: true,
      rules: {
        login: {
          required: true,
          minlength: "3"
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: "5"
        }
      },
      messages: {
        login: {
          required: $.t("validation_users.login_required"),
          minlength: $.t("validation_users.login_minlength")
        },
        email: {
          required: $.t("validation_users.email_required"),
          email: $.t("validation_users.email_bad_format")
        },
        password: {
          required: $.t("validation_users.password_required"),
          minlength: $.t("validation_users.password_minlength")
        }
      }
    };

    return User;

  })(Backbone.Model);

}).call(this);
Trackwane.Collections.Accounts = Backbone.Collection.extend({

  model: Trackwane.Models.Account,

  url: "/accounts"

});
Trackwane.Collections.Alerts = Backbone.Collection.extend({

  model: Trackwane.Models.Alert,

  url: "/alerts"

});
Trackwane.Collections.Devices = Backbone.Collection.extend({

  model: Trackwane.Models.Device,

  url: "/devices"

});
Trackwane.Collections.GeofenceAlarms = Backbone.Collection.extend({

  model: Trackwane.Models.GeofenceAlarm,

  url: "/geofence_alarms"

});
Trackwane.Collections.Geofences = Backbone.Collection.extend({

  model: Trackwane.Models.Geofence,

  url: "/geofences"

});
Trackwane.Collections.HistoricalEvents = Backbone.Collection.extend({

  model: Trackwane.Models.Event,

  url: "/events"

});
Trackwane.Collections.Places = Backbone.Collection.extend({

  model: Trackwane.Models.Place,

  url: "/places"

});
Trackwane.Collections.RealtimeEvents = Backbone.Collection.extend({

  model: Trackwane.Models.Event,

  url: "/events/realtime"

});
Trackwane.Collections.Reports = Backbone.Collection.extend({

  model: Trackwane.Models.Report,

  url: "/reports"

});
Trackwane.Collections.Schedules = Backbone.Collection.extend({

  model: Trackwane.Models.Schedule,

  url: "/schedules"

});
Trackwane.Collections.SpeedAlarms = Backbone.Collection.extend({

  model: Trackwane.Models.SpeedAlarm,

  url: "/speed_alarms"

});
Trackwane.Collections.Users = Backbone.Collection.extend({

  model: Trackwane.Models.User,

  url: "/users"

});
(function() {

  Trackwane.Core.Controls.PointBuilder = (function() {

    PointBuilder.name = 'PointBuilder';

    function PointBuilder(map, pubsub) {
      var callbacks,
        _this = this;
      this.map = map;
      this.pubsub = pubsub;
      this.cartography = new Trackwane.Core.Helpers.Cartography(this.map);
      this.draw_layer = this.cartography.createLayer("drawing_layer");
      this.map.addLayer(this.draw_layer);
      this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Point);
      callbacks = {
        featureadded: function() {
          var feature;
          _this.drawFeature.deactivate();
          feature = _this.draw_layer.features[0];
          return _this.pubsub.trigger("app:point-builder:feature-created", feature.toWSG84().asWKT());
        }
      };
      this.drawFeature.events.on(callbacks);
      this.map.addControl(this.drawFeature);
    }

    PointBuilder.prototype.activate = function() {
      return this.drawFeature.activate();
    };

    PointBuilder.prototype.deactivate = function() {
      this.draw_layer.destroyFeatures();
      return this.drawFeature.deactivate();
    };

    return PointBuilder;

  })();

}).call(this);
(function() {

  Trackwane.Core.Controls.PolygonBuilder = (function() {

    PolygonBuilder.name = 'PolygonBuilder';

    function PolygonBuilder(map, pubsub) {
      var callbacks, cartography,
        _this = this;
      this.map = map;
      this.pubsub = pubsub;
      cartography = new Trackwane.Core.Helpers.Cartography(map);
      this.draw_layer = cartography.createLayer("drawing_layer");
      this.map.addLayer(this.draw_layer);
      this.drawFeature = new OpenLayers.Control.DrawFeature(this.draw_layer, OpenLayers.Handler.Polygon);
      callbacks = {
        featureadded: function() {
          var polygon;
          polygon = _this.draw_layer.features[0];
          _this.pubsub.trigger("app:polygon-builder:feature-created", polygon.toWSG84());
          return _this.drawFeature.deactivate();
        }
      };
      this.drawFeature.events.on(callbacks);
      this.map.addControl(this.drawFeature);
    }

    PolygonBuilder.prototype.activate = function() {
      return this.drawFeature.activate();
    };

    PolygonBuilder.prototype.deactivate = function() {
      this.draw_layer.destroyFeatures();
      return this.drawFeature.deactivate();
    };

    return PolygonBuilder;

  })();

}).call(this);
(function() {

  OpenLayers.Bounds.fromExtent = function(extent) {
    var bounds, match, sourceProjection, targetProjection;
    match = /\((.+) (.+),(.+) (.+)\)/.exec(extent);
    bounds = match.slice(1);
    sourceProjection = new OpenLayers.Projection("EPSG:4326");
    targetProjection = new OpenLayers.Projection("EPSG:900913");
    return new OpenLayers.Bounds(bounds[1], bounds[2], bounds[3], bounds[0]).transform(sourceProjection, targetProjection);
  };

}).call(this);
(function() {

  OpenLayers.Feature.prototype.toLonLat = function() {
    return new OpenLayers.LonLat(this.geometry.x, this.geometry.y);
  };

  OpenLayers.Feature.prototype.followPath = function(animator, path) {
    var animation;
    animation = new Trackwane.Services.Animation(this, path);
    return animator.add(animation);
  };

  OpenLayers.Feature.prototype.rotate = function(angle) {
    this.style.rotation = angle;
    return this.layer.drawFeature(this);
  };

  OpenLayers.Feature.prototype.asWKT = function() {
    var format;
    format = new OpenLayers.Format.WKT();
    return format.write(this);
  };

  OpenLayers.Feature.prototype.toWSG84 = function() {
    var sourceProjection, targetProjection;
    sourceProjection = new OpenLayers.Projection("EPSG:900913");
    targetProjection = new OpenLayers.Projection("EPSG:4326");
    this.geometry = this.geometry.transform(sourceProjection, targetProjection);
    return this;
  };

}).call(this);
(function() {

  OpenLayers.Map.prototype.createFeatureLayer = function(name, useClustering) {
    var context, formatting, layer, options, style;
    if (useClustering) {
      formatting = {
        pointRadius: "${radius}",
        label: "${counter}",
        fillColor: "#397DB7",
        fillOpacity: 0.9,
        strokeColor: "#1B4C7A",
        strokeWidth: 2,
        fontColor: 'white',
        fontWeight: 'bold',
        strokeOpacity: 0.9
      };
      context = {
        radius: function(feature) {
          return feature.cluster.length + 10;
        },
        counter: function(feature) {
          return feature.cluster.length;
        }
      };
      style = new OpenLayers.Style(formatting, {
        context: context
      });
      options = {
        strategies: [
          new OpenLayers.Strategy.Cluster({
            distance: 20,
            threshold: 2
          })
        ],
        styleMap: new OpenLayers.StyleMap({
          "default": style,
          "select": {
            fillColor: "#8aeeef",
            strokeColor: "#32a8a9"
          }
        })
      };
      layer = new OpenLayers.Layer.Vector(name, options);
    } else {
      layer = new OpenLayers.Layer.Vector(name);
    }
    this.addLayer(layer);
    return layer;
  };

  OpenLayers.Map.prototype.addCommonControls = function() {
    var controls, panZoom;
    panZoom = new OpenLayers.Control.PanZoomBar();
    panZoom.zoomWorldIcon = false;
    controls = [new OpenLayers.Control.ScaleLine(), new OpenLayers.Control.DragPan(), new OpenLayers.Control.Navigation(), panZoom];
    this.addControls(controls);
    return $.each(controls, (function(index, item) {
      return item.activate();
    }));
  };

}).call(this);
(function() {
  var moduleKeywords,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  Trackwane.Core.Framework.Controller = (function(_super) {

    __extends(Controller, _super);

    Controller.name = 'Controller';

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Controller.include = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((_ref = obj.included) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Controller.prototype.initialize = function(options) {
      Controller.__super__.initialize.call(this, options);
      this.pubsub = _.extend({}, Backbone.Events);
      return this.handleApplicationEvents();
    };

    Controller.prototype.init = function(options) {
      this.pubsub = _.extend({}, Backbone.Events);
      return this.handleApplicationEvents();
    };

    Controller.prototype.handleApplicationEvents = function() {
      var events,
        _this = this;
      if (this.appEvents) {
        events = _.keys(this.appEvents);
        return _.each(events, function(key) {
          return _this.pubsub.on(key, _this[_this.appEvents[key]].bind(_this));
        });
      }
    };

    return Controller;

  })(Backbone.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Core.Framework.RealtimeMap = (function(_super) {

    __extends(RealtimeMap, _super);

    RealtimeMap.name = 'RealtimeMap';

    function RealtimeMap() {
      return RealtimeMap.__super__.constructor.apply(this, arguments);
    }

    RealtimeMap.create = function(el, callback) {
      var gmap, params;
      gmap = new OpenLayers.Layer.Google("Streets");
      params = {
        theme: null,
        controls: [],
        minZoomLevel: 5,
        maxZoomLevel: 12,
        layers: [gmap]
      };
      this.map = new OpenLayers.Map(el, params);
      if (callback) {
        google.maps.event.addListener(gmap.mapObject, 'tilesloaded', function() {
          callback();
          return google.maps.event.clearListeners(gmap.mapObject, 'tilesloaded');
        });
      }
      this.map.addCommonControls();
      this.map.createFeatureLayer("alarms");
      this.map.createFeatureLayer("places");
      this.map.createFeatureLayer("trackers", true);
      return this.map;
    };

    return RealtimeMap;

  })(OpenLayers.Map);

}).call(this);
(function() {
  var moduleKeywords,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  Trackwane.Core.Framework.View = (function(_super) {

    __extends(View, _super);

    View.name = 'View';

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    View.include = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((_ref = obj.included) != null) {
        _ref.apply(this);
      }
      return this;
    };

    View.prototype.template = null;

    View.prototype.pubsub = null;

    View.prototype.initialize = function(options) {
      View.__super__.initialize.call(this, options);
      this.validate(options);
      this.pubsub = options.pubsub;
      this.template = Handlebars.compile($(this.template_id).html());
      if (this.appEvents) {
        return this.handleApplicationEvents();
      }
    };

    View.prototype.validate = function(options) {
      if (!options.pubsub) {
        throw "[Trackwane] Publish-Subscribe mechanism is not initialized.";
      }
      if (this.template_id && $(this.template_id).length === 0) {
        throw "[Trackwane] The template ID " + this.template_id + " could not be located.";
      }
    };

    View.prototype.hide = function() {
      return this.$el.hide();
    };

    View.prototype.show = function() {
      return this.$el.show();
    };

    View.prototype.select = function(selector) {
      return this.$el.find(selector);
    };

    View.prototype.publish = function(event, data) {
      return this.pubsub.trigger(event, data);
    };

    View.prototype.handleApplicationEvents = function() {
      var events,
        _this = this;
      if (this.appEvents !== void 0) {
        events = _.keys(this.appEvents);
        return _.each(events, function(key) {
          if (!_this[_this.appEvents[key]]) {
            throw "[Trackwane] The method " + _this.appEvents[key] + " is not a defined.";
          }
          return _this.pubsub.on(key, _this[_this.appEvents[key]].bind(_this));
        });
      }
    };

    return View;

  })(Backbone.View);

}).call(this);
(function() {

  Trackwane.Core.Helpers.Animation = (function() {

    Animation.name = 'Animation';

    Animation.prototype.cursor = 0;

    Animation.prototype.finished = 0;

    function Animation(feature, path) {
      this.feature = feature;
      this.path = path;
      this.log = Trackwane.Logger.get("Animation");
      this.device_id = feature.device_id;
    }

    Animation.prototype.execute = function(frame) {
      var coordinates, next_point;
      this.log.debug("[animator] Animating device " + this.device_id + " (frame " + frame + "; cursor " + this.cursor + "; steps " + this.path.length + ")");
      if (!this.finished) {
        next_point = this.path[this.cursor];
        coordinates = new OpenLayers.LonLat(next_point.x, next_point.y);
        this.feature.move(coordinates);
        this.cursor = this.cursor + 1;
        if (this.cursor >= this.path.length) {
          return this.finished = true;
        }
      }
    };

    return Animation;

  })();

}).call(this);
(function() {

  Trackwane.Core.Helpers.Animator = (function() {

    Animator.name = 'Animator';

    Animator.prototype.animations = [];

    Animator.prototype.frame = 0;

    function Animator() {
      this.log = Trackwane.Logger.get("Animator");
    }

    Animator.prototype.add = function(animation) {
      var isDuplicate;
      this.log.debug("Adding animation for device " + animation.device_id + " at frame " + this.frame + ".");
      isDuplicate = _.any(this.animations, (function(current) {
        return current.device_id === animation.device_id;
      }));
      if (isDuplicate) {
        return this.raiseDuplicationError(animation);
      } else {
        return this.animations.push(animation);
      }
    };

    Animator.prototype.raiseDuplicationError = function(animation) {
      clearTimeout(this.timeout);
      throw new Error("Attempted to insert a duplication animation for device " + animation.device_id + ".");
    };

    Animator.prototype.animationLoop = function() {
      var animationsToRemove,
        _this = this;
      animationsToRemove = [];
      this.log.debug("Executing animations at frame " + this.frame);
      if (!_.isEmpty(this.animations)) {
        _.each(this.animations, function(animation) {
          animation.execute(_this.frame);
          if (animation.finished) {
            return animationsToRemove.push(animation);
          }
        });
        _.each(animationsToRemove, function(animationToRemove) {
          return _this.animations = _.filter(_this.animations, function(animation) {
            return animation.device_id !== animationToRemove.device_id;
          });
        });
      }
      this.frame = this.frame + 1;
      return this.timeout = setTimeout(this.animationLoop.bind(this), this.delta);
    };

    Animator.prototype.start = function(delta) {
      this.delta = delta;
      return this.animationLoop();
    };

    return Animator;

  })();

}).call(this);
(function() {

  Trackwane.Core.Helpers.Cartography = (function() {

    Cartography.name = 'Cartography';

    function Cartography(map) {
      this.map = map;
    }

    Cartography.prototype.createMap = function(el, callback) {};

    return Cartography;

  })();

}).call(this);
(function() {

  Trackwane.Core.Helpers.Mapper = (function() {

    Mapper.name = 'Mapper';

    function Mapper() {
      this.cartography = new Trackwane.Core.Helpers.Cartography();
    }

    Mapper.prototype.toFeature = function(model, style) {
      var feature, point;
      point = OpenLayers.Geometry.Point(model.get("longitude"), model.get("latitude"));
      point = OpenLayers.Projection.transform(point, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      feature = new OpenLayers.Feature.Vector(point, model);
      feature.id = model.id;
      if (style) {
        feature.style = style;
      } else {
        feature.style = {
          pointRadius: 10,
          externalGraphic: "/assets/arrow.png",
          rotation: model.get("heading")
        };
      }
      return feature;
    };

    Mapper.prototype.toRealtimeFeature = function(model) {
      var feature, style;
      style = {
        label: model.get("name"),
        labelOutlineColor: 'white',
        labelOutlineWidth: "4px",
        labelYOffset: 23,
        fontWeight: "bold",
        pointRadius: 20,
        externalGraphic: "/assets/marker-coupe-red.png",
        rotation: model.get("heading")
      };
      feature = this.toGraphicFeature(model.get("longitude"), model.get("latitude"), model, style, model.id);
      feature.device_id = model.get("device_id");
      return feature;
    };

    Mapper.prototype.toGraphicFeature = function(longitude, latitude, model, style, id) {
      var feature, point;
      point = new OpenLayers.Geometry.Point(longitude, latitude);
      point = OpenLayers.Projection.transform(point, new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
      feature = new OpenLayers.Feature.Vector(point, model);
      feature.id = id;
      feature.style = style;
      return feature;
    };

    Mapper.prototype.toPlaceFeatures = function(places) {
      var _this = this;
      return places.map(function(place) {
        return _this.toPlaceFeature(place);
      });
    };

    Mapper.prototype.toGeofenceFeature = function(name, coordinates) {
      var feature, format;
      format = new OpenLayers.Format.WKT();
      feature = format.read(coordinates);
      feature.style = {
        label: name,
        labelOutlineColor: 'white',
        labelOutlineWidth: "4px",
        fontWeight: "bold",
        fontColor: "#084a8c",
        fillColor: "#ee9900",
        fillOpacity: 0.3,
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeColor: "#ee9900"
      };
      return feature;
    };

    Mapper.prototype.toGeofenceFeatures = function(geofences) {
      var _this = this;
      return geofences.map(function(geofence) {
        var coordinates, name;
        coordinates = geofence.get("coordinates");
        name = geofence.get("name");
        return _this.toGeofenceFeature(name, coordinates);
      });
    };

    return Mapper;

  })();

}).call(this);
(function() {

  Trackwane.Core.Helpers.Route = (function() {

    Route.name = 'Route';

    function Route(start, end) {
      this.start = start.geometry;
      this.end = end.geometry;
      this.log = Trackwane.Logger.get("Route");
    }

    Route.prototype.getAngle = function() {
      var dx, dy, theta;
      dy = this.end.y - this.start.y;
      dx = this.end.x - this.start.x;
      theta = Math.atan2(dx, dy);
      theta *= 180 / Math.PI;
      return theta - 90;
    };

    Route.prototype.getPoints = function(num) {
      var points, range,
        _this = this;
      if (this.start.x === this.end.x && this.start.y === this.end.y) {
        return null;
      } else {
        points = [];
        range = _.range(1, num + 1, 1);
        _.each(range, function(i) {
          var delta, point, x, y;
          delta = i * (1 / num);
          x = _this.start.x + delta * (_this.end.x - _this.start.x);
          y = _this.start.y + delta * (_this.end.y - _this.start.y);
          point = new OpenLayers.Geometry.Point(x, y);
          return points.push(point);
        });
        return points;
      }
    };

    return Route;

  })();

}).call(this);
(function() {

  Trackwane.Core.Traits.Alarms = {
    activatePolygonBuilder: function() {
      if (this.polygon_builder == null) {
        this.polygon_builder = new Trackwane.Core.Controls.PolygonBuilder(this.map, this.pubsub);
      }
      return this.polygon_builder.activate();
    },
    clearPolygonBuilder: function() {
      if (this.polygon_builder) {
        return this.polygon_builder.deactivate();
      }
    }
  };

}).call(this);
(function() {

  Trackwane.Core.Traits.Editor = {
    accept: function(callback) {
      return this.$el.find("form").validate(_.extend(this.validation_rules, callback));
    },
    close: function() {
      this.$el.empty();
      return this.$el.hide();
    },
    render: function() {
      this.$el.html(this.template);
      return this.$el.show();
    }
  };

}).call(this);
(function() {

  Trackwane.Core.Traits.Listing = {
    onMasterToggle: function() {
      var checkboxes, notChecked,
        _this = this;
      checkboxes = this.select("td input");
      if (this.select("th input").is(":checked")) {
        notChecked = checkboxes.not(":checked");
        if (notChecked.length > 0) {
          return notChecked.each(function(i, item) {
            $(item).attr("checked", true);
            return _this.changeVisibility($(item).data("id"));
          });
        }
      } else {
        return checkboxes.each(function(i, item) {
          $(item).attr("checked", false);
          return _this.changeVisibility($(item).data("id"));
        });
      }
    },
    onToggle: function(evt) {
      var id;
      id = $(evt.currentTarget).data("id");
      return this.changeVisibility(id);
    }
  };

}).call(this);
(function() {

  Trackwane.Core.Traits.Places = {
    activatePointBuilder: function() {
      if (!this.point_builder) {
        this.point_builder = new Trackwane.Core.Controls.PointBuilder(this.map, this.pubsub);
      }
      return this.point_builder.activate();
    },
    clearPointBuilder: function() {
      if (this.point_builder) {
        return this.point_builder.deactivate();
      }
    }
  };

}).call(this);
Trackwane.Views.Accounts.Editor = Trackwane.Core.Framework.View.extend({

  events: {
    "click .create": "onCreate",
    "click .delete": "onDelete",
    "click .save": "onSave",
    "click .cancel": "onClose"
  },

  onCreate: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:created", attributes);
  },

  onDelete: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:deleted", attributes);
  },

  onClose: function() {
    this.close();
  },

  onSave: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("account:saved", attributes);
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  prepareTemplates: function() {
    var source = $("#editor-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(place) {
    this.$el.html(this.template(place));
    this.$el.show();
  }

});
Trackwane.Views.Accounts.Listing = Trackwane.Core.Framework.View.extend({

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
    if (confirm("Are you sure you want to delete this user?")) {
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
Trackwane.Views.Historical.Devices = Backbone.View.extend({

  events: {
    "click a": "onDeviceSelect"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#devices-template").html();
    this.template = Handlebars.compile(source);
  },

  onDeviceSelect: function(evt) {
    this.pubsub.trigger("device:selected", $(evt.currentTarget).data("id"));
  },

  render: function(devices) {
    this.devices = devices;
    this.$el.html(this.template(devices));
    this.$el.lionbars();
  }

});
Trackwane.Views.Historical.Events = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#events-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(events) {
    this.events = events;
    this.$el.html(this.template(events));
  }

});
Trackwane.Views.Historical.Map = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.setElement(options.el);
    OpenLayers.ImgPath = '/assets/OpenLayers/';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    this.load();
  },

  render: function(events) {
    this.event_layer.destroyFeatures();
    this.createFeatures(events);
  },

  createFeatures: function(events) {
    if (!events || events.size() < 1) return;
    events.each(function(event) {
      this.createFeature(event);
    }.bind(this));
    if (!this.initialized) {
      this.initialized = true;
      this.map.zoomToExtent(this.event_layer.getDataExtent());
    }
  },

  createFeature: function(event) {
    var mapper = new Trackwane.Services.Mapper();
    var feature = mapper.toFeature(event);
    this.event_layer.addFeatures([feature]);
  },

  hidePanels: function() {
    if (this.new_place_panel) {
      this.$el.find(".action.panel").remove();
      this.new_place_panel.destroy();
    }
  },

  showGeofences: function(geofences) {
    if (!this.geofence_layer) {
      var cartography = new Trackwane.Services.Cartography(this.map);
      this.geofence_layer = cartography.createLayer("geofences");
    }
    var mapper = new Trackwane.Services.Mapper();
    var features = mapper.toGeofenceFeatures(geofences);
    this.geofence_layer.addFeatures(features);
  },

  hidePlaces: function() {
    this.place_layer.destroyFeatures();
    this.removePopups("place");
  },

  showPlaces: function(places) {
    if (!this.place_layer) {
      var cartography = new Trackwane.Services.Cartography(this.map);
      this.place_layer = cartography.createLayer("places");
    }
    var mapper = new Trackwane.Services.Mapper();
    var features = mapper.toPlaceFeatures(places);
    this.place_layer.addFeatures(features);
    if (!places || places.size() < 1) return;
    this.removePopups("place");
    places.each(function(place) {
      this.createPlacePopup(place.attributes, place.getCoordinates());
    }.bind(this));
  },

  load: function() {
    this.$el.empty();
    var cartography = new Trackwane.Services.Cartography();
    this.map = cartography.createMap(this.el);
    this.event_layer = cartography.createLayer("events");
    this.map.zoomTo(1);
  }

});
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.FeaturePanel = (function(_super) {

    __extends(FeaturePanel, _super);

    FeaturePanel.name = 'FeaturePanel';

    function FeaturePanel() {
      return FeaturePanel.__super__.constructor.apply(this, arguments);
    }

    FeaturePanel.prototype.Scope = Trackwane.Views.Realtime;

    FeaturePanel.prototype.events = {
      "click a.speed-alarms": "onShowSpeedAlarms",
      "click a.places": "onShowPlaces",
      "click a.geofence-alarms": "onShowGeofenceAlarms"
    };

    FeaturePanel.prototype.initialize = function(options) {
      FeaturePanel.__super__.initialize.call(this, options);
      this.place_panel = new this.Scope.Places.Panel({
        el: "#place-panel",
        pubsub: this.pubsub,
        places: options.places
      });
      this.geofence_alarm_panel = new this.Scope.GeofenceAlarms.Panel({
        el: "#canvas #geofence-alarm-panel",
        pubsub: this.pubsub,
        geofence_alarms: options.geofence_alarms
      });
      return this.speed_alarm_panel = new this.Scope.SpeedAlarms.Panel({
        el: "#canvas #speed-alarm-panel",
        pubsub: this.pubsub,
        speed_alarms: options.speed_alarms
      });
    };

    FeaturePanel.prototype.render = function(options) {
      this.place_panel.render();
      this.speed_alarm_panel.render();
      return this.geofence_alarm_panel.render();
    };

    FeaturePanel.prototype.onShowSpeedAlarms = function() {
      this.hidePanels();
      return this.speed_alarm_panel.show();
    };

    FeaturePanel.prototype.onShowPlaces = function() {
      this.hidePanels();
      return this.place_panel.show();
    };

    FeaturePanel.prototype.onShowGeofenceAlarms = function() {
      this.hidePanels();
      return this.geofence_alarm_panel.show();
    };

    FeaturePanel.prototype.hidePanels = function() {
      this.speed_alarm_panel.hide();
      this.geofence_alarm_panel.hide();
      return this.place_panel.hide();
    };

    return FeaturePanel;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.GeofenceAlarms.Editor = (function(_super) {

    __extends(Editor, _super);

    Editor.name = 'Editor';

    function Editor() {
      return Editor.__super__.constructor.apply(this, arguments);
    }

    Editor.include(Trackwane.Core.Traits.Editor);

    Editor.prototype.validation_rules = Trackwane.Models.GeofenceAlarm.validation_rules;

    Editor.prototype.template_id = "#geofence-alarm-editor-template";

    Editor.prototype.events = {
      "click .cancel": "onCancel",
      "click .accept": "onAccept"
    };

    Editor.prototype.initialize = function(options) {
      return Editor.__super__.initialize.call(this, options);
    };

    Editor.prototype.onAccept = function() {
      var callback,
        _this = this;
      callback = {
        submitHandler: function() {
          var alarm, name;
          name = _this.$el.find("input[name='geofence_alarm[name]']").val();
          alarm = new Trackwane.Models.GeofenceAlarm({
            name: name,
            bounds: _this.polygon.asWKT()
          });
          _this.pubsub.trigger("geofence-alarm:created", alarm);
          return false;
        }
      };
      return this.accept(callback);
    };

    Editor.prototype.onCancel = function() {
      this.pubsub.trigger("geofence-alarm-editor:closing");
      this.hide();
      return false;
    };

    Editor.prototype.select = function(geofence) {
      return this.geofence = geofence;
    };

    Editor.prototype.render = function(offset) {
      this.show();
      this.$el.html(this.template());
      if (offset) {
        return this.$el.css("top", offset - 250);
      }
    };

    return Editor;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.GeofenceAlarms.Listing = (function(_super) {

    __extends(Listing, _super);

    Listing.name = 'Listing';

    function Listing() {
      return Listing.__super__.constructor.apply(this, arguments);
    }

    Listing.prototype.template_id = "#geofence-alarm-listing-template";

    Listing.prototype.events = {
      "click .remove": "onRemove",
      "click .select": "onSelect"
    };

    Listing.prototype.initialize = function(options) {
      return Listing.__super__.initialize.call(this, options);
    };

    Listing.prototype.onRemove = function(evt) {
      if (confirm("Are you sure you want to delete this geofence alarm?")) {
        this.pubsub.trigger("geofence-alarm:deleted", $(evt.currentTarget).data("id"));
      }
      return false;
    };

    Listing.prototype.onSelect = function(evt) {
      this.pubsub.trigger("geofence-alarm:selected", $(evt.currentTarget).data("id"));
      return false;
    };

    Listing.prototype.render = function(alarms) {
      return this.$el.html(this.template(alarms));
    };

    return Listing;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.GeofenceAlarms.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.name = 'Panel';

    function Panel() {
      return Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.Scope = Trackwane.Views.Realtime.GeofenceAlarms;

    Panel.prototype.events = {
      "click #btn-new-geofence-alarm": "onCreateGeofenceAlarm"
    };

    Panel.prototype.appEvents = {
      "event:select": "onSelectEvent",
      "geofence-alarm:created": "onGeofenceAlarmCreated",
      "geofence-alarm:deleted": "onGeofenceAlarmDeleted",
      "geofence-alarm-editor:closing": "onEditorClosing",
      "app:polygon-builder:feature-created": "onFeatureCreated"
    };

    Panel.prototype.initialize = function(options) {
      Panel.__super__.initialize.call(this, options);
      this.listing = new this.Scope.Listing({
        el: "#geofence-alarm-panel #geofence-alarms",
        pubsub: this.pubsub
      });
      this.editor = new this.Scope.Editor({
        el: "#geofence-alarm-panel .editor",
        pubsub: this.pubsub
      });
      return this.geofence_alarms = new Trackwane.Collections.GeofenceAlarms(options.geofence_alarms);
    };

    Panel.prototype.onFeatureCreated = function(polygon) {
      return this.editor.polygon = polygon;
    };

    Panel.prototype.onGeofenceAlarmCreated = function(geofence_alarm) {
      var callbacks,
        _this = this;
      callbacks = {
        success: function(model) {
          _this.geofence_alarms.add(model);
          _this.editor.close();
          _this.onEditorClosing();
          return _this.render();
        }
      };
      return geofence_alarm.save(null, callbacks);
    };

    Panel.prototype.onGeofenceAlarmDeleted = function() {
      this.geofence_alarms.get(id).destroy();
      return this.render();
    };

    Panel.prototype.onSelectEvent = function(event_id) {
      return this.pubsub.trigger("app:action");
    };

    Panel.prototype.onEditorClosing = function() {
      return this.pubsub.trigger("app:polygon-builder:clear");
    };

    Panel.prototype.onCreateGeofenceAlarm = function(evt) {
      this.pubsub.trigger("app:polygon-builder:activate");
      return this.editor.render();
    };

    Panel.prototype.render = function() {
      return this.listing.render(this.geofence_alarms);
    };

    return Panel;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Map = (function(_super) {

    __extends(Map, _super);

    Map.name = 'Map';

    function Map() {
      return Map.__super__.constructor.apply(this, arguments);
    }

    Map.include(Trackwane.Core.Traits.Places);

    Map.include(Trackwane.Core.Traits.Alarms);

    Map.prototype.initialize = function(options) {
      Map.__super__.initialize.call(this, options);
      this.places = new Trackwane.Collections.Places();
      this.geofences = new Trackwane.Collections.Geofences();
      this.animator = new Trackwane.Core.Helpers.Animator();
      this.animator.start(400);
      return this.mapper = new Trackwane.Core.Helpers.Mapper();
    };

    Map.prototype.showFeature = function(model) {
      switch (model.constructor.name) {
        case "Place":
          return this.showOnLayer("places", model);
        case "Device":
          return this.showOnLayer("trackers", model);
        case "SpeedAlarm":
          return this.showOnLayer("alarms", model);
        case "GeofenceAlarm":
          return this.showOnLayer("alarms", model);
        default:
          throw "Unknown feature type";
      }
    };

    Map.prototype.hideFeature = function(model) {
      switch (model.constructor.name) {
        case "Place":
          return this.hide("places", model.id);
        case "Device":
          return this.hide("trackers", model.id);
        case "SpeedAlarm":
          return this.hide("alarms", model.id);
        case "GeofenceAlarm":
          return this.hide("alarms", model.id);
        default:
          throw "Unknown feature type";
      }
    };

    Map.prototype.showOnLayer = function(layer_name, model) {
      return this.map.getLayersByName(layer_name)[0].addFeatures([model.toFeature()]);
    };

    Map.prototype.hide = function(layer_name, id) {
      var feature, layer;
      console.debug(id);
      layer = this.map.getLayersByName(layer_name)[0];
      console.debug(layer);
      feature = layer.getFeaturesByAttribute("id", id);
      console.debug(feature);
      return layer.destroyFeatures(feature);
    };

    Map.prototype.centerFeature = function(model) {
      var feature;
      feature = this.device_layer.getFeatureById(event_id);
      if (feature) {
        return this.map.panTo(feature.toLonLat());
      }
    };

    Map.prototype.show = function(events) {
      var features,
        _this = this;
      if (events.any()) {
        features = events.map(function(event) {
          return _this.mapper.toRealtimeFeature(event);
        });
        return this.map.getLayerByName("trackers").addFeatures(features);
      }
    };

    Map.prototype.showEvent = function(event_data) {
      var feature, numPoints, path;
      numPoints = 10;
      path = this.moveFeature(event_data, numPoints);
      if (path) {
        feature = this.device_layer.getFeatureBy("device_id", event_data.device_id);
        return feature.followPath(this.animator, path);
      }
    };

    Map.prototype.moveFeature = function(event_data, numPoints) {
      var feature, route, target;
      feature = this.device_layer.getFeatureBy("device_id", event_data.device_id);
      if (feature) {
        target = this.mapper.toDestinationFeature(event_data);
        route = new Trackwane.Route(feature, target);
        if (route) {
          feature.rotate(route.getAngle());
        }
        return route.getPoints(numPoints);
      } else {
        return;
      }
    };

    Map.prototype.render = function(extent, callback) {
      this.$el.empty();
      this.map = Trackwane.Core.Framework.RealtimeMap.create(this.el, callback);
      if (extent) {
        extent = OpenLayers.Bounds.fromExtent(extent);
      } else {
        extent = new OpenLayers.Bounds(-1928659.0974232, 202405.25087096, 1202201.5807018, 1647982.329599);
      }
      return this.map.zoomToExtent(extent);
    };

    return Map;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Places.Editor = (function(_super) {

    __extends(Editor, _super);

    Editor.name = 'Editor';

    function Editor() {
      return Editor.__super__.constructor.apply(this, arguments);
    }

    Editor.include(Trackwane.Core.Traits.Editor);

    Editor.prototype.validation_rules = Trackwane.Models.Place.validation_rules;

    Editor.prototype.template_id = "#place-editor-template";

    Editor.prototype.events = {
      "click button.accept": "onAccept",
      "click button.cancel": "onCancel"
    };

    Editor.prototype.initialize = function(options) {
      return Editor.__super__.initialize.call(this, options);
    };

    Editor.prototype.onAccept = function() {
      var callback,
        _this = this;
      callback = {
        submitHandler: function() {
          var category, name;
          name = _this.select("#place_name").val();
          category = _this.select("#place_category").val();
          _this.createPlace(name, category, _this.point.asWKT());
          return false;
        }
      };
      return this.accept(callback);
    };

    Editor.prototype.onCancel = function() {
      this.publish("place-editor:closing");
      return this.close();
    };

    Editor.prototype.createPlace = function(name, category, lonlat) {
      var place;
      place = new Trackwane.Models.Place({
        name: name,
        category: category,
        lonlat: lonlat
      });
      return this.publish("place:created", place);
    };

    return Editor;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Places.Listing = (function(_super) {

    __extends(Listing, _super);

    Listing.name = 'Listing';

    function Listing() {
      return Listing.__super__.constructor.apply(this, arguments);
    }

    Listing.include(Trackwane.Core.Traits.Listing);

    Listing.prototype.template_id = "#place-listing-template";

    Listing.prototype.events = {
      "click a.select": "onSelect",
      "click a.remove": "onRemove",
      "click td input[type='checkbox']": "onToggle",
      "click th input[type='checkbox']": "onMasterToggle"
    };

    Listing.prototype.changeVisibility = function(id) {
      var master;
      if (this.isChecked(id)) {
        return this.publish("place:show", id);
      } else {
        master = this.select("th input");
        if (master.is(":checked")) {
          master.attr("checked", false);
        }
        return this.publish("place:hide", id);
      }
    };

    Listing.prototype.onRemove = function(evt) {
      var id;
      if (confirm("Are you sure you want to delete this place?")) {
        id = $(evt.currentTarget).data("id");
        return this.publish("place:deleted", id);
      }
    };

    Listing.prototype.onSelect = function(evt) {
      var id, input;
      id = $(evt.currentTarget).data("id");
      if (!this.isChecked(id)) {
        input = this.findCheckbox(id);
        input.attr("checked", "checked");
        this.onToggle(evt);
      }
      return this.publish("place:selected", id);
    };

    Listing.prototype.findCheckbox = function(id) {
      return this.select("input[data-id='" + id + "']");
    };

    Listing.prototype.isChecked = function(id) {
      var input;
      input = this.findCheckbox(id);
      return input && input.is(":checked");
    };

    Listing.prototype.render = function(places) {
      return this.$el.html(this.template(places));
    };

    return Listing;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Places.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.name = 'Panel';

    function Panel() {
      return Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.Scope = Trackwane.Views.Realtime.Places;

    Panel.prototype.events = {
      "click #btn-new-place": "onCreatePlace"
    };

    Panel.prototype.appEvents = {
      "place:selected": "onPlaceSelected",
      "place:created": "onPlaceCreated",
      "place:deleted": "onPlaceDeleted",
      "place:show": "onPlaceShow",
      "place:hide": "onPlaceHide",
      "place-editor:closing": "onEditorClosing",
      "app:point-builder:feature-created": "onFeatureCreated"
    };

    Panel.prototype.initialize = function(options) {
      Panel.__super__.initialize.call(this, options);
      this.listing = new this.Scope.Listing({
        el: "#place-panel .listing",
        pubsub: this.pubsub
      });
      this.editor = new this.Scope.Editor({
        el: "#place-panel .editor",
        pubsub: this.pubsub
      });
      return this.places = new Trackwane.Collections.Places(options.places);
    };

    Panel.prototype.onFeatureCreated = function(point) {
      return this.editor.point = point;
    };

    Panel.prototype.onPlaceShow = function(id) {
      var place;
      place = this.places.get(id);
      return this.publish("feature:show", place);
    };

    Panel.prototype.onPlaceHide = function(id) {
      var place;
      place = this.places.get(id);
      return this.publish("feature:hide", place);
    };

    Panel.prototype.onPlaceDeleted = function(id) {
      this.places.get(id).destroy();
      return this.render();
    };

    Panel.prototype.onEditorClosing = function() {
      return this.publish("app:point-builder:clear");
    };

    Panel.prototype.onPlaceCreated = function(place) {
      var callbacks,
        _this = this;
      callbacks = {
        success: function(model) {
          _this.places.add(model);
          _this.editor.close();
          _this.onEditorClosing();
          return _this.render();
        }
      };
      return place.save(null, callbacks);
    };

    Panel.prototype.onPlaceSelected = function(id) {
      var place;
      place = this.places.get(id);
      return this.publish("feature:select", place);
    };

    Panel.prototype.onCreatePlace = function(evt) {
      this.publish("app:point-builder:activate");
      return this.editor.render();
    };

    Panel.prototype.render = function() {
      return this.listing.render(this.places);
    };

    return Panel;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.SpeedAlarms.Editor = (function(_super) {

    __extends(Editor, _super);

    Editor.name = 'Editor';

    function Editor() {
      return Editor.__super__.constructor.apply(this, arguments);
    }

    Editor.include(Trackwane.Core.Traits.Editor);

    Editor.prototype.validation_rules = Trackwane.Models.SpeedAlarm.validation_rules;

    Editor.prototype.template_id = "#speed-alarm-editor-template";

    Editor.prototype.events = {
      "click .cancel": "onCancel",
      "click .accept": "onAccept"
    };

    Editor.prototype.initialize = function(options) {
      return Editor.__super__.initialize.call(this, options);
    };

    Editor.prototype.onAccept = function() {
      var callback,
        _this = this;
      callback = {
        submitHandler: function() {
          var alarm, name, speed;
          name = $("input[name='speed_alarm[name]']").val();
          speed = $('input[name="speed_alarm[speed]"]').val();
          alarm = new Trackwane.Models.SpeedAlarm({
            speed: speed,
            name: name,
            bounds: _this.polygon.asWKT()
          });
          _this.pubsub.trigger("speed-alarm:created", alarm);
          return false;
        }
      };
      return this.accept(callback);
    };

    Editor.prototype.onCancel = function() {
      this.pubsub.trigger("speed-alarm-editor:closing");
      return false;
    };

    Editor.prototype.render = function(offset) {
      this.$el.html(this.template());
      if (offset) {
        this.$el.css("top", offset - 200);
      }
      return this.show();
    };

    return Editor;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.SpeedAlarms.Listing = (function(_super) {

    __extends(Listing, _super);

    Listing.name = 'Listing';

    function Listing() {
      return Listing.__super__.constructor.apply(this, arguments);
    }

    Listing.include(Trackwane.Core.Traits.Editor);

    Listing.prototype.template_id = "#speed-alarm-listing-template";

    Listing.prototype.events = {
      "click .remove": "onRemove",
      "click .select": "onSelect"
    };

    Listing.prototype.initialize = function(options) {
      return Listing.__super__.initialize.call(this, options);
    };

    Listing.prototype.onRemove = function(evt) {
      if (confirm("Are you sure you want to delete this speed alarm?")) {
        this.publish("speed-alarm:deleted", $(evt.currentTarget).data("id"));
      }
      return false;
    };

    Listing.prototype.onSelect = function(evt) {
      this.publish("speed-alarm:selected", $(evt.currentTarget).data("id"));
      return false;
    };

    Listing.prototype.render = function(alarms) {
      this.$el.html(this.template(alarms));
      return this.$el.lionbars();
    };

    return Listing;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.SpeedAlarms.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.name = 'Panel';

    function Panel() {
      return Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.Scope = Trackwane.Views.Realtime.SpeedAlarms;

    Panel.prototype.events = {
      "click #btn-new-speed-alarm": "onCreateSpeedAlarm"
    };

    Panel.prototype.appEvents = {
      "speed-alarm:selected": "onSpeedAlarmSelected",
      "speed-alarm:deleted": "onSpeedAlarmDeleted",
      "speed-alarm:created": "onSpeedAlarmCreated",
      "speed-alarm:saved": "onSpeedAlarmSaved",
      "speed-alarm-editor:closing": "onEditorClosing",
      "app:polygon-builder:feature-created": "onFeatureCreated"
    };

    Panel.prototype.initialize = function(options) {
      Panel.__super__.initialize.call(this, options);
      this.listing = new this.Scope.Listing({
        el: "#speed-alarms",
        pubsub: this.pubsub
      });
      this.editor = new this.Scope.Editor({
        el: "#speed-alarm-panel .editor",
        pubsub: this.pubsub
      });
      return this.speed_alarms = new Trackwane.Collections.SpeedAlarms(options.speed_alarms);
    };

    Panel.prototype.onSpeedAlarmSelected = function(event_id) {
      return this.pubsub.trigger("app:action");
    };

    Panel.prototype.onFeatureCreated = function(polygon) {
      return this.editor.polygon = polygon;
    };

    Panel.prototype.onSpeedAlarmDeleted = function() {};

    Panel.prototype.onSpeedAlarmSaved = function() {};

    Panel.prototype.onSpeedAlarmCreated = function() {};

    Panel.prototype.onCreateSpeedAlarm = function(evt) {
      this.publish("app:polygon-builder:activate");
      return this.editor.render();
    };

    Panel.prototype.onEditorClosing = function() {
      return this.publish("app:polygon-builder:clear");
    };

    Panel.prototype.render = function() {
      return this.listing.render(this.speed_alarms);
    };

    return Panel;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Toolbar = (function(_super) {

    __extends(Toolbar, _super);

    Toolbar.name = 'Toolbar';

    function Toolbar() {
      return Toolbar.__super__.constructor.apply(this, arguments);
    }

    Toolbar.prototype.events = {
      "click .places": "onClickPlaces",
      "click .geofences": "onClickGeofenceAlarms"
    };

    Toolbar.prototype.initialize = function(options) {
      this.pubsub = options.pubsub;
      return this.setElement(this.el);
    };

    Toolbar.prototype.onClickPlaces = function(evt) {
      $(evt.currentTarget).toggleClass("highlight");
      return this.pubsub.trigger("places:toggle");
    };

    Toolbar.prototype.onClickGeofenceAlarms = function(evt) {
      $(evt.currentTarget).toggleClass("highlight");
      return this.pubsub.trigger("geofence-alarms:toggle");
    };

    return Toolbar;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Trackers.Editor = (function(_super) {

    __extends(Editor, _super);

    Editor.name = 'Editor';

    function Editor() {
      return Editor.__super__.constructor.apply(this, arguments);
    }

    Editor.include(Trackwane.Core.Traits.Editor);

    Editor.prototype.validation_rules = Trackwane.Models.Device.validation_rules;

    Editor.prototype.template_id = "#tracker-editor-template";

    Editor.prototype.events = {
      "click .create": "onCreate",
      "click .cancel": "onClose",
      "click .save": "onSave"
    };

    Editor.prototype.initialize = function(options) {
      return Editor.__super__.initialize.call(this, options);
    };

    Editor.prototype.onCreate = function() {
      var callback,
        _this = this;
      callback = {
        submitHandler: function() {
          var attributes;
          attributes = _this.formAttributes();
          return _this.publish("tracker:created", attributes);
        }
      };
      return this.select("form").validate(_.extend(this.validation_rules, callback));
    };

    Editor.prototype.onDelete = function() {
      var attributes;
      attributes = this.formAttributes();
      return this.publish("tracker:deleted", attributes);
    };

    Editor.prototype.onClose = function() {
      return this.close();
    };

    Editor.prototype.onSave = function() {
      var callback,
        _this = this;
      callback = {
        submitHandler: function() {
          var attributes;
          attributes = _this.formAttributes();
          return _this.publish("tracker:saved", attributes);
        }
      };
      return this.select("form").validate(_.extend(Trackwane.Models.Device.validation_rules, callback));
    };

    Editor.prototype.formAttributes = function() {
      var attributes, items;
      attributes = {};
      items = this.select("input, select");
      items.each(function(i, item) {
        var key;
        key = $(item).attr("name");
        if (key) {
          return attributes[key] = $(item).val();
        }
      });
      return attributes;
    };

    Editor.prototype.render = function(tracker) {
      tracker || (tracker = {});
      this.$el.html(this.template(tracker));
      return this.$el.show();
    };

    return Editor;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Trackers.Listing = (function(_super) {

    __extends(Listing, _super);

    Listing.name = 'Listing';

    function Listing() {
      return Listing.__super__.constructor.apply(this, arguments);
    }

    Listing.prototype.template_id = "#tracker-listing-template";

    Listing.prototype.events = {
      "click a": "onSelection"
    };

    Listing.prototype.initialize = function(options) {
      Listing.__super__.initialize.call(this, options);
      return $(window).resize(this.onResize.bind(this));
    };

    Listing.prototype.onSelection = function(evt) {
      return this.pubsub.trigger("event:select", $(evt.currentTarget).data("id"));
    };

    Listing.prototype.update = function(event) {
      var address, entry, place, place_info;
      entry = this.findTracker(event.device_id);
      address = entry.find(".address");
      place = entry.find(".place");
      place_info = event.place ? "Proche de " + event.place.name : "";
      place.html(place_info);
      if (address.text() !== event.address) {
        return address.html(event.address);
      }
    };

    Listing.prototype.onResize = function() {
      var max_height, original_height, window_height;
      window_height = $(window).height();
      original_height = this.$el.height();
      max_height = window_height / 2;
      if (original_height > max_height) {
        return this.$el.height(max_height);
      }
    };

    Listing.prototype.findTracker = function(id) {
      return this.$el.find("tr[data-id='" + id + "']");
    };

    Listing.prototype.render = function(trackers) {
      this.$el.html(this.template(trackers));
      return this.onResize();
    };

    return Listing;

  })(Trackwane.Core.Framework.View);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Views.Realtime.Trackers.Panel = (function(_super) {

    __extends(Panel, _super);

    Panel.name = 'Panel';

    function Panel() {
      return Panel.__super__.constructor.apply(this, arguments);
    }

    Panel.prototype.Scope = Trackwane.Views.Realtime.Trackers;

    Panel.prototype.events = {
      "click #btn-new-tracker": "onCreateTracker"
    };

    Panel.prototype.appEvents = {
      "tracker:selected": "onTrackerSelected",
      "tracker:created": "onTrackerCreated",
      "tracker:saved": "onTrackerSaved",
      "tracker:deleted": "onTrackerDeleted"
    };

    Panel.prototype.initialize = function(options) {
      Panel.__super__.initialize.call(this, options);
      this.listing = new this.Scope.Listing({
        el: "#canvas #trackers",
        pubsub: this.pubsub
      });
      return this.editor = new this.Scope.Editor({
        el: "#tracker-panel .editor",
        pubsub: this.pubsub
      });
    };

    Panel.prototype.onTrackerSelected = function(event_id) {
      return this.pubsub.trigger("app:action");
    };

    Panel.prototype.onCreateTracker = function(evt) {
      this.pubsub.trigger("tracker:create");
      return this.editor.render();
    };

    Panel.prototype.onTrackerCreated = function(attributes) {
      var callbacks, device,
        _this = this;
      device = new Trackwane.Models.Device(attributes);
      callbacks = {
        success: function(model) {
          _this.trackers.add(model);
          _this.pubsub.trigger("trackers:fetched", _this.trackers);
          _this.editor.close();
          return _this.render(_this.trackers);
        }
      };
      return device.save(null, callbacks);
    };

    Panel.prototype.onTrackerDeleted = function() {};

    Panel.prototype.onTrackerSaved = function() {};

    Panel.prototype.render = function(trackers) {
      this.trackers = trackers;
      return this.listing.render(trackers);
    };

    return Panel;

  })(Trackwane.Core.Framework.View);

}).call(this);
Trackwane.Views.Reports.Devices = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#devices-template").html();
    this.template = Handlebars.compile(source);
    $(window).resize(this.onResize.bind(this));
  },

  onResize: function() {
    this.render(this.devices);
  },

  resize: function() {
    var window_height = $(window).height();
    this.$el.height(window_height - 392);
    $('.lionbars').lionbars();
  },

  close: function() {
    this.$el.hide();
  },

  getDevices: function() {
    var devices = [];
    $("input.device:checked").each(function(i, item) {
      devices.push($(item).val());
    });
    return devices;
  },

  render: function(devices) {
    this.$el.show();
    this.devices = devices;
    this.$el.html(this.template(devices));
    this.resize();
  }

});
Trackwane.Views.Reports.NewReport = Backbone.View.extend({

  events: {
    "click .cancel": "onCancel",
    "click .accept": "onAccept"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#new-report-template").html();
    this.template = Handlebars.compile(source);
  },

  onAccept: function() {
    var name = this.$el.find("#report_name").val();
    if (!name) {
      alert("Please give your new report a name");
      return false;
    }
    this.pubsub.trigger("new-report:accept", this.parameters, this.devices, name)
  },

  onCancel: function() {
    this.pubsub.trigger("new-report:cancel");
    return false;
  },

  render: function(parameters, devices) {
    this.parameters = parameters;
    this.devices = devices;
    this.$el.show();
    this.$el.html(this.template({parameters: parameters, devices: devices}));
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  }

});
Trackwane.Views.Reports.Parameters = Backbone.View.extend({

  initialize: function(options) {
    this.pubsub = options.pubsub;
  },

  close: function() {
    this.$el.hide();
  },

  getParameters: function() {
    var type = $("select.type").val();
    var date = $("input.datepicker").val();
    var period = $("select.period").val();
    return {type: type, date: date, period: period};
  },

  render: function() {
    this.$el.show();
    var source = $("#parameters-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template());
    $(".datepicker").datepicker({ dateFormat: 'yy-mm-dd' });
    $(".datepicker").datepicker('setDate', new Date());
  }

});
Trackwane.Views.Reports.Presentation = Backbone.View.extend({

  events: {
    "click button": "onRunReport"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    $(window).resize(this.onResize.bind(this));
  },

  onResize: function() {
    var window_height = $(window).height();
    var window_width = $(window).width();
    this.$el.height(window_height - 140);
    this.$el.width(window_width - 260);
  },

  onRunReport: function() {
    this.pubsub.trigger("report:run");
  },

  togglePresentation: function() {
    if (this.table.is(":visible")) {
      this.table.hide();
      this.chart.show();
    } else {
      this.chart.hide();
      this.table.show();
    }
  },

  close: function() {
    this.$el.hide();
  },

  run: function(parameters, results) {
    if (parameters.type == "Alert" || parameters.type == "Stop") {
      this.createTable(parameters.type.toLowerCase(), results);
      this.$el.find("#chart").hide();
      this.$el.find("#table").show();
    } else {
      this["create" + parameters.type + "Chart"](results);
      this.createTable(parameters.type.toLowerCase(), results);
      this.table.hide();
      this.chart.show();
    }
  },

  createTable: function(type, results) {
    var source = $("#" + type + "-table-template").html();
    template = Handlebars.compile(source);
    this.$el.find("#table").html(template(results));
  },

  createDistanceChart: function(results) {
    var data = this.parseDataPoints(results);
    return new Highcharts.Chart({
      chart: {renderTo: 'chart', type: 'spline'},
      title: {text: 'Vehicle Distance Covered'},
      xAxis: {type: 'datetime', dateTimeLabelFormats: {month: '%e. %b', year: '%b'}},
      yAxis: {title: {text: 'Distance (km)'}, min: 0},
      series: data
    });
  },

  createSpeedChart: function(results) {
    var data = this.parseDataPoints(results);
    return new Highcharts.Chart({
      chart: {renderTo: 'chart', type: 'spline'},
      title: {text: 'Vehicle Speeds'},
      xAxis: {type: 'datetime', dateTimeLabelFormats: {month: '%e. %b', year: '%b'}},
      yAxis: {title: {text: 'Speed (km/h)'}, min: 0},
      series: data
    });
  },

  parseDataPoints: function(results) {
    var series = _.groupBy(results, function(item) {
      return item.device_name;
    });
    return  _.map(_.keys(series), function(key) {
      return {
        name: key,
        data: series[key].map(function(data_point) {
          var date = Date.parseString(data_point.period, "yyyy-MM-dd HH:mm:ss");
          var utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
          var value = parseFloat(data_point.value);
          return [utc,  value]
        })
      };
    });
  },

  render: function() {
    this.$el.show();
    var source = $("#presentation-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template());

    this.chart = this.$el.find("#chart");
    this.table = this.$el.find("#table");
    this.onResize();
  }

});
Trackwane.Views.Reports.Reports = Backbone.View.extend({

  events: {
    "click a.remove": "onDeleteReport",
    "click a.show": "onShowReport"
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    var source = $("#reports-template").html();
    this.template = Handlebars.compile(source);
    $(window).resize(this.onResize.bind(this));
  },

  onDeleteReport: function(evt) {
    if (confirm("Are you sure you want to delete this report?")) {
      var id = $(evt.currentTarget).data("id");
      this.pubsub.trigger("report:delete", id);
    }
  },

  onShowReport: function(evt) {
    var id = $(evt.currentTarget).data("id");
    this.pubsub.trigger("report:show", id);
  },

  onResize: function() {
    var window_height = $(window).height();
    this.$el.height(window_height - 392);
    $('.lionbars').lionbars();
  },

  render: function(reports) {
    this.$el.show();
    this.$el.html(this.template(reports));
    this.onResize();
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  }

});
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
Trackwane.Views.Users.Editor = Trackwane.Core.Framework.View.extend({

 events: {
    "click .create": "onCreate",
    "click .delete": "onDelete",
    "click .save": "onSave",
    "click .cancel": "onClose"
  },

  onCreate: function() {
   var callback = {
      submitHandler: function() {
        var attributes = this.formAttributes();
        this.pubsub.trigger("user:created", attributes);
      }.bind(this)
    };
    console.debug(Trackwane.Models.User.validation_rules);
    this.$el.find("form").validate(_.extend(Trackwane.Models.User.validation_rules, callback));
  },

  onDelete: function() {
    var attributes = this.formAttributes();
    this.pubsub.trigger("user:deleted", attributes);
  },

  onClose: function() {
    this.close();
  },

  onSave: function() {
    var callback = {
      submitHandler: function() {
      var attributes = this.formAttributes();
      this.pubsub.trigger("user:saved", attributes);
      }.bind(this)
    };
    this.$el.find("form").validate(_.extend(Trackwane.Models.User.validation_rules, callback));
  },

  close: function() {
    this.$el.empty();
    this.$el.hide();
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  },

  initialize: function(options) {
    this.pubsub = options.pubsub;
    this.prepareTemplates();
  },

  prepareTemplates: function() {
    var source = $("#editor-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(place) {
    this.$el.html(this.template(place));
    this.$el.show();
  }

});
Trackwane.Views.Users.Listing = Trackwane.Core.Framework.View.extend({

  events: {
    "click tr td.selectable" : "onUserSelect",
    "click button.save": "onUserSave",
    "click .remove": "onUserDelete",
    "click button.create": "onUserCreate"
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

  onUserSave: function() {
    this.pubsub.trigger("user:saved");
  },

  onUserDelete: function(evt) {
    if (confirm("Are you sure you want to delete this user?")) {
      var id = $(evt.currentTarget).parents("tr").data("id");
      this.pubsub.trigger("user:deleted", id);
    }
  },

  onUserSelect: function(evt) {
    var id = $(evt.currentTarget).parent("tr").data("id");
    this.pubsub.trigger("user:selected", id);
  },

  onUserCreate: function() {
    this.pubsub.trigger("user:created");
  },

  prepareTemplates: function() {
    var source = $("#listing-template").html();
    this.template = Handlebars.compile(source);
  },

  render: function(users) {
    this.users = users;
    this.$el.html(this.template(users));
    this.$el.show();
    this.resize();
  }

});
Trackwane.Controllers.AccountController = Trackwane.Core.Framework.Controller.extend({

  events: {
    "click .accept": "onSave"
  },

  onSave: function() {
    var attributes = this.formAttributes();
    var errors = this.validate(attributes);
    if (errors) {
      this.showErrors(errors);
    } else {
      $.ajax({
        url: "/account",
        type: "POST",
        data: attributes,
        success: function() {
          this.showSuccess();
        },
        error: function(xhr, status, errors) {
          this.showErrors(errors);
        }
      });
    }
  },

  showErrors: function(errors) {
    var alert = this.$el.find(".alert");
    alert.addClass(".alert-error");
    alert.removeClass(".alert-success");
    alert.html(errors);
  },

  showSuccess: function() {
    var alert = this.$el.find(".alert");
    alert.addClass(".alert-success");
    alert.removeClass(".alert-error");
    alert.html("<p>Your account was successfully updated.</p>");
  },

  formAttributes: function() {
    var attributes = {};
    this.$el.find("input, select").each(function(i, item) {
      var key = $(item).attr("name");
      if (key) attributes[key] = $(item).val();
    });
    return attributes;
  }
});

Trackwane.Controllers.AccountsController = Trackwane.Core.Framework.Controller.extend({

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
    this.listing = new Trackwane.Views.Accounts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Accounts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.pubsub.trigger("accounts:fetched", new Trackwane.Collections.Accounts(options.accounts));
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
    var account = new Trackwane.Models.Account(attributes);
    account.save(null, {success: function(model) {
        this.accounts.add(model);
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
Trackwane.Controllers.AlarmsController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "geofence:creating": "onCreatingGeofenceAlarm",
    "speed:creating": "onCreatingSpeedAlarm",
    "geofence:created": "onGeofenceAlarmCreated",
    "speed:created": "onSpeedAlarmCreated",
    "speed:closing": "onClose",
    "geofence:closing": "onClose",
    "geofence-alarm:deleted": "onGeofenceAlarmDeleted",
    "geofence-alarm:selected": "onGeofenceAlarmSelected",
    "speed-alarm:deleted": "onSpeedAlarmDeleted",
    "speed-alarm:selected": "onSpeedAlarmSelected",
    "alarms:clear": "onClearAlarms",
    "speed-alarms:show": "onShowSpeedAlarms",
    "geofence-alarms:show": "onShowGeofenceAlarms"
  },

  initialize: function(options) {
    this.init(options);
    this.map = new Trackwane.Views.AlarmMap({el: "#map", pubsub: this.pubsub});
    this.new_speed_alarm_panel = new Trackwane.Views.Alarms.SpeedPanel({el: "#canvas #new-speed-alarm-panel", pubsub: this.pubsub});
    this.new_geofence_alarm_panel = new Trackwane.Views.Alarms.GeofencePanel({el: "#canvas #new-geofence-alarm-panel", pubsub: this.pubsub});
    this.alarm_listing = new Trackwane.Views.Alarms.Listing({el: "#canvas #alarm-listing", pubsub: this.pubsub});
    this.toolbar = new Trackwane.Views.Alarms.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.map.render(options.extent);
    this.fetchAlarms();
  },

  onShowGeofenceAlarms: function() {
    this.map.clear();
    new Trackwane.Collections.GeofenceAlarms().fetch({success: function(results) {
      this.map.showAlarms(results);
    }.bind(this)});
  },

  onShowSpeedAlarms: function() {
    this.map.clear();
    new Trackwane.Collections.SpeedAlarms().fetch({success: function(results) {
      this.map.showAlarms(results);
    }.bind(this)});
  },

  onClearAlarms: function() {
    this.map.clear();
  },

  onGeofenceAlarmSelected: function(id) {
    var model = new Trackwane.Models.GeofenceAlarm({id: id});
    model.fetch({success: function(model) {
        this.map.clear();
        this.map.show(model.get("name"), model.get("coordinates"));
      }.bind(this)
    });
  },

  onSpeedAlarmDeleted: function(id) {
    var model = new Trackwane.Models.SpeedAlarm({id: id});
    model.destroy();
    new Trackwane.Collections.SpeedAlarms().fetch({success: function(results) {
      this.alarm_listing.addSpeedAlarm(results);
    }.bind(this)});
  },

  onGeofenceAlarmDeleted: function(id) {
    var model = new Trackwane.Models.GeofenceAlarm({id: id});
    model.destroy();
    new Trackwane.Collections.GeofenceAlarms().fetch({success: function(results) {
      this.alarm_listing.addGeofenceAlarm(results);
    }.bind(this)});
  },

  onSpeedAlarmSelected: function(id) {
    var model = new Trackwane.Models.SpeedAlarm({id: id});
    model.fetch({success: function(model) {
      this.map.clear();
        this.map.show(model.get("name"), model.get("coordinates"));
      }.bind(this)
    });
  },

  fetchAlarms: function() {
    this.geofence_alarms = new Trackwane.Collections.GeofenceAlarms();
    this.speed_alarms = new Trackwane.Collections.SpeedAlarms();
    this.speed_alarms.fetch({success: function(results) {
      this.alarm_listing.addSpeedAlarm(results);
    }.bind(this)});
    this.geofence_alarms.fetch({success: function(results) {
      this.alarm_listing.addGeofenceAlarm(results);
    }.bind(this)});
  },

  close: function() {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.close();
    this.map.stopEditing();
  },

  onClose: function() {
    this.close();
  },

  onSpeedAlarmCreated: function(alarm) {
    var coordinates = this.map.getCoordinates();
    console.debug(coordinates);
    if (coordinates) {
      alarm.set({coordinates: coordinates});
      alarm.save(null, {
        success: function() {
          this.new_speed_alarm_panel.close();
          this.close();
          this.speed_alarms.add(alarm);
          this.alarm_listing.addSpeedAlarm(this.speed_alarms);
        }.bind(this),
        error: function() {
          this.close();
        }.bind(this)
      });      
    }
    else {
      alert("You must drawn on the map before saving");
    }
  },

  onGeofenceAlarmCreated: function(alarm) {
    if (this.map.getCoordinates()) {
      var coordinates = this.map.getCoordinates();
      alarm.set({coordinates: coordinates});
      alarm.save(null, {
        success: function() {
          this.new_geofence_alarm_panel.close();
          this.close();
          this.geofence_alarms.add(alarm);
          this.alarm_listing.addGeofenceAlarm(this.geofence_alarms);
        }.bind(this),
        error: function() {
          this.close();
        }.bind(this)
      });
    }
    else{
      alert("You must drawn on the map before saving");
    } 
  },

  onCreatingSpeedAlarm: function(evt) {
    this.new_geofence_alarm_panel.close();
    this.new_speed_alarm_panel.render(evt.screenY);
    this.map.startEditing();
  },

  onCreatingGeofenceAlarm: function(evt) {
    this.new_speed_alarm_panel.close();
    this.new_geofence_alarm_panel.render(evt.screenY);
    this.map.startEditing();
  }

});

Trackwane.Controllers.AlertsController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "alerts:fetched": "onAlertsFetched",
    "editor:closed": "onEditorClosed",
    "alert:selected": "onAlertSelected",
    "alert:created": "onAlertCreated",
    "alert:saved": "onAlertSaved",
    "alert:deleted": "onAlertDeleted"
  },

  events: {
    "click .new-alert": "onNewAlert"
  },

  initialize: function(options) {
    this.init(options);
    this.alarms = this.getAvailableAlarms(options.geofence_alarms, options.speed_alarms);
    this.listing = new Trackwane.Views.Alerts.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Alerts.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new Trackwane.Views.Alerts.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    this.listing.render(new Trackwane.Collections.Alerts(options.alerts));
  },

  getAvailableAlarms: function(geofence_alarms, speed_alarms) {
    var attributes = this.parseAlarms(new Trackwane.Collections.GeofenceAlarms(geofence_alarms), "GeofenceAlarm");
    var alarms = _.union([], attributes);
    attributes = this.parseAlarms(new Trackwane.Collections.SpeedAlarms(speed_alarms), "SpeedAlarm");
    return _.union(alarms, attributes);
  },

  parseAlarms: function(alarms, type) {
    alarms.map(function(alarm) {
      return {id: alarm.id, name: alarm.get("name"), type: type};
    });
  },

  onNewAlert: function() {
    this.editor.render({alarms: this.alarms});
  },

  onAlertsFetched: function(alerts) {
    this.alerts = alerts;
    this.listing.render(alerts);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onAlertSelected: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.editor.render({alert: alert, alarms: this.alarms});
  },

  onAlertCreated: function(attributes) {
    var alert = new Trackwane.Models.Alert(attributes);
    alert.save(null, {success: function(model) {
        this.alerts.add(model);
        this.listing.render(this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertSaved: function(attributes) {
    var alert = this.alerts.get(attributes.id);
    alert.save(attributes, {success: function() {
        this.listing.render(this.alerts);
        this.editor.close();
      }.bind(this)
    });
  },

  onAlertDeleted: function(device_id) {
    var alert = this.alerts.get(device_id);
    this.alerts.remove(device);
    alert.destroy();
    this.editor.close();
    this.listing.render(this.alerts);
  }

});
Trackwane.Controllers.DevicesController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "devices:fetched": "onDevicesFetched",
    "editor:closed": "onEditorClosed",
    "device:selected": "onDeviceSelected",
    "device:creating": "onDeviceCreating",
    "device:created": "onDeviceCreated",
    "device:saved": "onDeviceSaved",
    "device:deleted": "onDeviceDeleted"
  },

  events: {
    "click .new_device": "onNewDevice"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new Trackwane.Views.Devices.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Devices.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.pubsub.trigger("devices:fetched", new Trackwane.Collections.Devices(options.devices));
  },

  onNewDevice: function() {
    this.editor.render({});
  },

  onDevicesFetched: function(devices) {
    this.devices = devices;
    this.listing.render(devices);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onDeviceSelected: function(device_id) {
    var device = this.devices.get(device_id);
    this.editor.render(device);
  },

  onDeviceCreated: function(attributes) {
    var device = new Trackwane.Models.Device(attributes);
    device.save(null, {success: function(model) {
        this.devices.add(model);
        this.pubsub.trigger("devices:fetched", this.devices);
        this.editor.close();
      }.bind(this)
    });
  },

  onDeviceCreating: function() {
    this.editor.render({});
  },

  onDeviceSaved: function(attributes) {
    var device = this.devices.get(attributes.id);
    device.save(attributes, {success: function() {
        this.pubsub.trigger("devices:fetched", this.devices);
        this.editor.close();
      }.bind(this)
    });
  },

  onDeviceDeleted: function(device_id) {
    var device = this.devices.get(device_id);
    this.devices.remove(device);
    device.destroy();
    this.editor.close();
    this.listing.render(this.devices);
  }

});

Trackwane.Controllers.HistoricalController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "device:selected": "onDeviceSelected"
  },

  initialize: function(options) {
    this.init(options);
    this.devices_view = new Trackwane.Views.Historical.Devices({el: "#canvas .listing", pubsub: this.pubsub});
    this.map = new Trackwane.Views.Historical.Map({el: "#map", pubsub: this.pubsub});
    this.events_view =  new Trackwane.Views.Historical.Events({el: "#canvas .events", pubsub: this.pubsub});
    this.devices_view.render(new Trackwane.Collections.Devices(options.devices));
    this.datepicker = this.$el.find(".parameters input");
    this.datepicker.datepicker({ dateFormat: 'yy-mm-dd' });
    this.datepicker.datepicker('setDate', new Date());
  },

  onDeviceSelected: function(device_id) {
    new Trackwane.Collections.HistoricalEvents().fetch({
      data: {
        device_id: device_id,
        date: this.datepicker.val()
      },
      success: function(events) {
        this.events_view.render(events);
        this.map.render(events);
      }.bind(this)
    });
  }

});

Trackwane.Controllers.PlacesController = Trackwane.Core.Framework.Controller.extend({

  events: {
    "click .toolbar .button": "onToggleNames",
    "click button.new-place": "onCreatePlace"
  },

  appEvents: {
    "place:selected": "onPlaceSelected",
    "new-place:cancel": "onNewPlaceCancel",
    "place:created": "onPlaceCreated",
    "place:removed": "onRemovePlace"
  },

  initialize: function(options) {
    this.init(options);
    this.map = new Trackwane.Views.PlacesMap({el: "#map", pubsub: this.pubsub});
    this.map.render(options.extent);
    this.listing = new Trackwane.Views.Places.Listing({el: "#canvas .listing", pubsub: this.pubsub});
    this.new_place_panel = new Trackwane.Views.NewPlacePanel({el: "#new-place-panel", pubsub: this.pubsub});
    this.render(new Trackwane.Collections.Places(options.places));
  },

  onPlaceSelected: function(id) {
    this.map.center(id);
  },

  onToggleNames: function() {
    alert("onToggleNames");
  },

  onRemovePlace: function(id) {
    new Trackwane.Collections.Places().fetch({success: function(results) {
      results.get(id).destroy();
      this.render(results);
    }.bind(this)});
  },

  render: function(results) {
    this.listing.render(results);
    this.map.show(results);
  },

  onPlaceCreated: function(place) {
    var lonlat = this.map.place_selection_tool.getCoordinates();
    if (lonlat) {
      place.setCoordinates(lonlat.x, lonlat.y);
      place.save(null, {
        success: function() {
          new Trackwane.Collections.Places().fetch({success: function(results) {
            this.render(results);
          }.bind(this)});
          this.stopEditing();
        }.bind(this),
        error: function() {
          alert("failure");
          this.stopEditing();
        }.bind(this)
      });      
    }
    else {
      alert("You must drawn on the map before saving");
    }
  },

  onNewPlaceCancel: function() {
    this.stopEditing();
  },

  stopEditing: function() {
    this.new_place_panel.close();
    this.map.stopEditing();
  },

  onCreatePlace: function(evt) {
    this.new_place_panel.render(evt.screenY);
    this.map.allowPlaceSelection();
  }

});

Trackwane.Controllers.ProfileController = Trackwane.Core.Framework.Controller.extend({

  initialize: function() {
  }

});

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Trackwane.Controllers.RealtimeController = (function(_super) {

    __extends(RealtimeController, _super);

    RealtimeController.name = 'RealtimeController';

    function RealtimeController() {
      return RealtimeController.__super__.constructor.apply(this, arguments);
    }

    RealtimeController.prototype.Scope = Trackwane.Views.Realtime;

    RealtimeController.prototype.appEvents = {
      "app:polygon-builder:activate": "onActivatePolygonBuilder",
      "app:polygon-builder:clear": "onClearPolygonBuilder",
      "app:point-builder:activate": "onActivatePointBuilder",
      "app:point-builder:clear": "onClearPointBuilder",
      "feature:show": "onFeatureShow",
      "feature:hide": "onFeatureHide",
      "feature:select": "onFeatureSelect",
      "app:reset": "onAppReset"
    };

    RealtimeController.prototype.initialize = function(options) {
      RealtimeController.__super__.initialize.call(this, options);
      this.toolbar = new this.Scope.Toolbar({
        el: "#canvas .listing.toolbar",
        pubsub: this.pubsub
      });
      this.feature_panel = new this.Scope.FeaturePanel({
        el: "#feature-panel",
        pubsub: this.pubsub,
        places: options.places,
        speed_alarms: options.speed_alarms,
        geofence_alarms: options.geofence_alarms
      });
      this.map = new this.Scope.Map({
        el: "#map",
        pubsub: this.pubsub
      });
      this.tracker_panel = new this.Scope.Trackers.Panel({
        el: "#tracker-panel",
        pubsub: this.pubsub
      });
      return this.render(options);
    };

    RealtimeController.prototype.render = function(options) {
      var events, trackers,
        _this = this;
      this.feature_panel.render(options);
      trackers = new Trackwane.Collections.RealtimeEvents(options.devices);
      events = new Trackwane.Collections.RealtimeEvents(options.events);
      return this.map.render(options.extent, (function() {
        return _this.showInitialPositions(trackers, events);
      }));
    };

    RealtimeController.prototype.onFeatureSelect = function(model) {
      return this.map.centerFeature(model);
    };

    RealtimeController.prototype.onFeatureShow = function(model) {
      return this.map.showFeature(model);
    };

    RealtimeController.prototype.onFeatureHide = function(model) {
      return this.map.hideFeature(model);
    };

    RealtimeController.prototype.onAppReset = function() {
      return this.map.reset();
    };

    RealtimeController.prototype.onClearPointBuilder = function() {
      return this.map.clearPointBuilder();
    };

    RealtimeController.prototype.onClearPolygonBuilder = function() {
      return this.map.clearPolygonBuilder();
    };

    RealtimeController.prototype.onActivatePolygonBuilder = function() {
      return this.map.activatePolygonBuilder();
    };

    RealtimeController.prototype.onActivatePointBuilder = function() {
      return this.map.activatePointBuilder();
    };

    RealtimeController.prototype.setupRealtimeTracking = function(trackers) {
      var pusher,
        _this = this;
      pusher = new Pusher('fee5deb878965544bd90');
      return trackers.each(function(tracker) {
        var channel;
        channel = pusher.subscribe("" + (tracker.get("account_id")) + "-" + (tracker.get("device_id")));
        return channel.bind('event-received', (function(event) {
          _this.listing.update(event);
          return _this.map.showEvent(event);
        }));
      });
    };

    RealtimeController.prototype.showInitialPositions = function(trackers, events) {
      this.tracker_panel.render(trackers);
      this.map.show(events);
      return this.setupRealtimeTracking(trackers);
    };

    return RealtimeController;

  })(Trackwane.Core.Framework.Controller);

}).call(this);
Trackwane.Controllers.ReportsController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "presentation:toggle": "onTogglePresentation",
    "export:pdf": "onExportPdf",
    "export:excel": "onExportExcel",
    "new-report:accept": "onNewReportCreated",
    "new-report:cancel": "onNewReportCancelled",
    "report:delete": "onReportDelete",
    "report:show": "onReportShow"
  },

  events: {
    "click .run": "onRunReport",
    "click .back": "onBackToParameters",
    "click a.save-report": "onSaveReport",
    "click a.your-reports": "onViewReports"
  },

  initialize: function(options) {
    this.init(options);

    this.presentation_view = new Trackwane.Views.Reports.Presentation({el: "#canvas .presentation", pubsub: this.pubsub});
    this.parameters_view = new Trackwane.Views.Reports.Parameters({el: "#canvas .parameters", pubsub: this.pubsub});
    this.toolbar_view = new Trackwane.Views.Reports.Toolbar({el: "#canvas .toolbar", pubsub: this.pubsub});
    this.new_report_view = new Trackwane.Views.Reports.NewReport({el: "#canvas .saved-report-details", pubsub: this.pubsub});

    this.presentation_view.render();
    this.parameters_view.render();
    this.toolbar_view.render();

    this.devices = new Trackwane.Collections.Devices();
    this.devices.fetch({success: function(collection) {
      this.device_view = new Trackwane.Views.Reports.Devices({el: "#canvas .device-listing", pubsub: this.pubsub});
      this.device_view.render(collection);
    }.bind(this)});

    this.reports_view = new Trackwane.Views.Reports.Reports({el: "#canvas .report-listing", pubsub: this.pubsub});
    this.reports = new Trackwane.Collections.Reports();
  },

  onReportDelete: function(id) {
    var report = this.reports.get(id);
    report.destroy();
    this.reports.fetch({success: function(collection) {
      this.reports_view.render(collection);
    }.bind(this)});
  },

  onReportShow: function(id) {
    this.showMainScreen();
    var report = this.reports.get(id);
    alert(report);
  },

  onNewReportCancelled: function() {
    this.new_report_view.close();
  },

  onNewReportCreated: function(parameters, devices, name) {
    var device_ids = _.map(devices, function(device) {
      return device.id;
    });
    var report = new Trackwane.Models.Report({parameters: parameters, devices: device_ids, name: name});
    report.save(null, {
      success: function() {
        this.new_report_view.close();
      }.bind(this),
      error: function(response) {
        alert(response);
      }
    });
  },

  onBackToParameters: function() {
    this.showMainScreen();
  },

  showMainScreen: function() {
    this.presentation_view.render();
    this.parameters_view.render();
    this.reports_view.close();
    this.$el.find(".btn-group").show();
    this.$el.find(".back").hide();
    this.devices.fetch({success: function(collection) {
      this.device_view.render(collection);
    }.bind(this)});
  },

  onViewReports: function() {
    this.showAlternateScreen();
  },

  showAlternateScreen: function() {
    this.presentation_view.close();
    this.parameters_view.close();
    this.device_view.close();
    this.$el.find(".btn-group").hide();
    this.$el.find(".back").show();
    this.reports.fetch({success: function(collection) {
      this.reports_view.render(collection);
    }.bind(this)});
  },

  onSaveReport: function() {
    var parameters = this.getReportParameters();
    if (!parameters) return;
    this.showAlternateScreen();
    var devices = _.map(parameters[1], function(device_id) {
      return this.devices.get(device_id);
    }.bind(this));
    this.new_report_view.render(parameters[0], devices);
  },

  onTogglePresentation: function() {
    this.presentation_view.togglePresentation();
  },

  onExportPdf: function() {
    alert("Not yet implemented...");
  },

  onExportExcel: function() {
    alert("Not yet implemented....")
  },

  onRunReport: function() {
    this.run();
  },

  run: function() {
    var parameters = this.getReportParameters();
    if (!parameters) return;
    $.ajax({
      method: 'get',
      url: "/reports/" + parameters[0].type.toLowerCase(),
      data: {
        vehicles: parameters[1],
        parameters: parameters[0]
      },
      success: function(results) {
        this.presentation_view.run(parameters[0], results);
      }.bind(this)
    });
  },

  getReportParameters: function() {
    var parameters = this.parameters_view.getParameters();
    if (parameters.date == "") {
      alert("Please select a date");
      return undefined;
    }
    var vehicles = this.device_view.getDevices();
    if (vehicles.length < 1) {
      alert("Please select one or more vehicles");
      return undefined;
    }
    return [parameters, vehicles];
  }


});
Trackwane.Controllers.SchedulesController = Trackwane.Core.Framework.Controller.extend({

  appEvents: {
    "schedules:fetched": "onSchedulesFetched",
    "editor:closed": "onEditorClosed",
    "schedule:selected": "onScheduleSelected",
    "schedule:created": "onScheduleCreated",
    "schedule:saved": "onScheduleSaved",
    "schedule:deleted": "onScheduleDeleted"
  },

  events: {
    "click .new-schedule": "onNewSchedule"
  },

  initialize: function(options) {
    this.init(options);
    this.listing = new Trackwane.Views.Schedules.Listing({pubsub: this.pubsub, el: "#canvas .listing"});
    this.editor = new Trackwane.Views.Schedules.Editor({pubsub: this.pubsub, el: "#canvas .editor"});
    this.toolbar = new Trackwane.Views.Schedules.Toolbar({pubsub: this.pubsub, el: "#canvas .toolbar"});
    new Trackwane.Collections.Schedules().fetch({success: function(results) {
        this.pubsub.trigger("schedules:fetched", results);
      }.bind(this)
    });
  },

  onSchedulesFetched: function(schedules) {
    this.schedules = schedules;
    this.listing.render(schedules);
  },

  onEditorClosed: function() {
    this.editor.close();
  },

  onScheduleSelected: function(device_id) {
    var schedule = this.schedules.get(device_id);
    this.editor.render(schedule);
  },

  onScheduleCreated: function(attributes) {
    var schedule = new Trackwane.Models.Schedule(attributes);
    schedule.save(null, {success: function(model) {
        this.schedules.add(model);
        this.pubsub.trigger("schedules:fetched", this.schedules);
        this.editor.close();
      }.bind(this)
    });
  },

  onNewSchedule: function() {
    this.editor.render({});
  },

  onScheduleSaved: function(attributes) {
    var schedule = this.schedules.get(attributes.id);
    schedule.save(attributes, {success: function() {
        this.pubsub.trigger("schedules:fetched", this.schedules);
        this.editor.close();
      }.bind(this)
    });
  },

  onScheduleDeleted: function(device_id) {
    var schedule = this.schedules.get(device_id);
    this.schedules.remove(device);
    schedule.destroy();
    this.editor.close();
    this.listing.render(this.schedules);
  }

});

Trackwane.Controllers.UsersController = Trackwane.Core.Framework.Controller.extend({

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
/**
 * Unobtrusive scripting adapter for jQuery
 *
 * Requires jQuery 1.4.3 or later.
 * https://github.com/rails/jquery-ujs
 */



(function($) {
	// Make sure that every Ajax request sends the CSRF token
	function CSRFProtection(xhr) {
		var token = $('meta[name="csrf-token"]').attr('content');
		if (token) xhr.setRequestHeader('X-CSRF-Token', token);
	}
	if ('ajaxPrefilter' in $) $.ajaxPrefilter(function(options, originalOptions, xhr){ CSRFProtection(xhr) });
	else $(document).ajaxSend(function(e, xhr){ CSRFProtection(xhr) });

	// Triggers an event on an element and returns the event result
	function fire(obj, name, data) {
		var event = $.Event(name);
		obj.trigger(event, data);
		return event.result !== false;
	}

	// Submits "remote" forms and links with ajax
	function handleRemote(element) {
		var method, url, data,
			dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

	if (fire(element, 'ajax:before')) {
		if (element.is('form')) {
			method = element.attr('method');
			url = element.attr('action');
			data = element.serializeArray();
			// memoized value from clicked submit button
			var button = element.data('ujs:submit-button');
			if (button) {
				data.push(button);
				element.data('ujs:submit-button', null);
			}
		} else {
			method = element.data('method');
			url = element.attr('href');
			data = null;
		}
			$.ajax({
				url: url, type: method || 'GET', data: data, dataType: dataType,
				// stopping the "ajax:beforeSend" event will cancel the ajax request
				beforeSend: function(xhr, settings) {
					if (settings.dataType === undefined) {
						xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
					}
					return fire(element, 'ajax:beforeSend', [xhr, settings]);
				},
				success: function(data, status, xhr) {
					element.trigger('ajax:success', [data, status, xhr]);
				},
				complete: function(xhr, status) {
					element.trigger('ajax:complete', [xhr, status]);
				},
				error: function(xhr, status, error) {
					element.trigger('ajax:error', [xhr, status, error]);
				}
			});
		}
	}

	// Handles "data-method" on links such as:
	// <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
	function handleMethod(link) {
		var href = link.attr('href'),
			method = link.data('method'),
			csrf_token = $('meta[name=csrf-token]').attr('content'),
			csrf_param = $('meta[name=csrf-param]').attr('content'),
			form = $('<form method="post" action="' + href + '"></form>'),
			metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

		if (csrf_param !== undefined && csrf_token !== undefined) {
			metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
		}

		form.hide().append(metadata_input).appendTo('body');
		form.submit();
	}

	function disableFormElements(form) {
		form.find('input[data-disable-with]').each(function() {
			var input = $(this);
			input.data('ujs:enable-with', input.val())
				.val(input.data('disable-with'))
				.attr('disabled', 'disabled');
		});
	}

	function enableFormElements(form) {
		form.find('input[data-disable-with]').each(function() {
			var input = $(this);
			input.val(input.data('ujs:enable-with')).removeAttr('disabled');
		});
	}

	function allowAction(element) {
		var message = element.data('confirm');
		return !message || (fire(element, 'confirm') && confirm(message));
	}

	function requiredValuesMissing(form) {
		var missing = false;
		form.find('input[name][required]').each(function() {
			if (!$(this).val()) missing = true;
		});
		return missing;
	}

	$('a[data-confirm], a[data-method], a[data-remote]').live('click.rails', function(e) {
		var link = $(this);
		if (!allowAction(link)) return false;

		if (link.data('remote') != undefined) {
			handleRemote(link);
			return false;
		} else if (link.data('method')) {
			handleMethod(link);
			return false;
		}
	});

	$('form').live('submit.rails', function(e) {
		var form = $(this), remote = form.data('remote') != undefined;
		if (!allowAction(form)) return false;

		// skip other logic when required values are missing
		if (requiredValuesMissing(form)) return !remote;

		if (remote) {
			handleRemote(form);
			return false;
		} else {
			// slight timeout so that the submit button gets properly serialized
			setTimeout(function(){ disableFormElements(form) }, 13);
		}
	});

	$('form input[type=submit], form button[type=submit], form button:not([type])').live('click.rails', function() {
		var button = $(this);
		if (!allowAction(button)) return false;
		// register the pressed submit button
		var name = button.attr('name'), data = name ? {name:name, value:button.val()} : null;
		button.closest('form').data('ujs:submit-button', data);
	});

	$('form').live('ajax:beforeSend.rails', function(event) {
		if (this == event.target) disableFormElements($(this));
	});

	$('form').live('ajax:complete.rails', function(event) {
		if (this == event.target) enableFormElements($(this));
	});
})( jQuery );


