App.Views.Reports.Presentation = Backbone.View.extend({

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
    this.$el.width(window_width - 320);
  },

  onRunReport: function() {
    this.pubsub.trigger("report:run");
  },

  run: function(parameters, results) {
    this["create" + parameters.type + "Chart"](results);
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

  createAlertChart: function(results) {
    var data = this.parseDataPoints(results);
    return new Highcharts.Chart({
      chart: {renderTo: 'chart', type: 'spline'},
      title: {text: 'Vehicle Alerts'},
      xAxis: {type: 'datetime', dateTimeLabelFormats: {month: '%e. %b', year: '%b'}},
      yAxis: {title: {text: 'Alert Count'}, min: 0},
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
      return item.device_id;
    });
    return  _.map(_.keys(series), function(key) {
      return {
        name: key,
        data: series[key].map(function(data_point) {
          var date = Date.parseString(data_point.period, "yyyy-MM-dd HH:mm:ss");
          var utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
          var value = parseFloat(data_point.max_speed);
          return [utc,  value]
        })
      };
    });
  },

  render: function() {
    var source = $("#presentation-template").html();
    var template = Handlebars.compile(source);
    this.$el.html(template());
    this.onResize();
  }

});