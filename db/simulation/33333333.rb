require 'date'

SIMULATION ||= {}
SIMULATION[33333333] = {
	event_interval: 10,
	start_time: DateTime.new(2012, 3, 3, 15, 0, 0),
	realtime_interval: 600, # in sec
	events: [
		{longitude: -4.03878, latitude: 5.34459, speed: 79, gps_signal: 'V'},
		{longitude: -4.04016, latitude: 5.35463, speed: 81, gps_signal: 'V'},
		{longitude: -4.04342, latitude: 5.36004, speed: 84},
		{longitude: -4.04539, latitude: 5.35308, speed: 80, gps_signal: 'V'},
		{longitude: -4.04496, latitude: 5.34338, speed: 68},
		{longitude: -4.05337, latitude: 5.34150},
		{longitude: -4.05844, latitude: 5.34562},
		{longitude: -4.05844, latitude: 5.34553},
		{longitude: -4.05621, latitude: 5.33969},
		{longitude: -4.05895, latitude: 5.32922}
	]
}
