Ext.define('Gowane.Mixins.Controllers.Charting', {

  buildChart: function(records, params, report_dom_id) {

    function findSerieForDevice(series, device_name) {
      var serie =_.find(series, function(item) {
        return item.name == device_name;
      });
      if (!serie) {
        serie = {name: device_name, data: [[Date.UTC(2012, 2, 1), 0]]};
        series.push(serie);
      }
      return serie;
    }

    var series = [];
    _.each(records, function(record) {
      var device_name = record.get("display_name");
      var serie = findSerieForDevice(series, device_name);
      var datetime = Ext.Date.parse(record.get("date"), "c");
      serie.data.push([datetime.valueOf(), record.get("speed")]);
    });

    new Highcharts.Chart({
      chart: {renderTo: report_dom_id, type: 'spline'},
		  title: {text: 'Speed Report'},
      xAxis: {type: 'datetime', dateTimeLabelFormats: {month: '%e. %b', year: '%b'}},
      yAxis: {title: {text: 'Speed (km/h)'}, min: 0}, tooltip: {
        formatter: function() {
            return '<b>'+ this.series.name +'</b><br/>'+
            Highcharts.dateFormat('%e. %b', this.x) +': '+ this.y +' m';
        }
      },
		  series: series
	  });
  }
});