require 'date'

SIMULATION ||= {}
SIMULATION[11111111] = {
	event_interval: 10,
	start_time: DateTime.new(2012, 3, 7, 15, 0, 0),
	realtime_interval: 600, # in sec
	events: [
		{longitude: -4.08586, latitude: 5.32144},
		{longitude: -4.08929, latitude: 5.32608, speed: 89},
		{longitude: -4.10303, latitude: 5.33294, speed: 93},
		{longitude: -4.09273, latitude: 5.34702, gps_signal: 'V'},
		{longitude: -4.07316, latitude: 5.34633},
		{longitude: -4.05908, latitude: 5.34307, gps_signal: 'V'},
		{longitude: -4.04243, latitude: 5.33878},
		{longitude: -4.03505, latitude: 5.32196},
		{longitude: -4.03797, latitude: 5.31234},
		{longitude: -4.04157, latitude: 5.31458, speed: 79, gps_signal: 'V'},
		{longitude: -4.04209, latitude: 5.32470, speed: 84}
		
	]
}
