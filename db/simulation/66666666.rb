require 'date'

SIMULATION ||= {}
SIMULATION[55676543] = {
	event_interval: 10,
	start_time: DateTime.new(2012, 1, 15, 8, 30, 0),
	realtime_interval: 600, # in sec
	events: [
		{longitude: -4.10251, latitude: 5.36822},
		{longitude: -4.08848, latitude: 5.36618},
		{longitude: -4.07612, latitude: 5.36043},
		{longitude: -4.06299, latitude: 5.35949, speed: 90},
		{longitude: -4.05200, latitude: 5.35803, speed: 102},
		{longitude: -4.04273, latitude: 5.36120, gps_signal: 'V'},
		{longitude: -4.03312, latitude: 5.36352},
		{longitude: -4.02205, latitude: 5.36155},
		{longitude: -4.01346, latitude: 5.35399},
		{longitude: -4.00471, latitude: 5.35468, gps_signal: 'V'},
		{longitude: -3.99037, latitude: 5.35477},
		{longitude: -3.98308, latitude: 5.35339},
		{longitude: -3.97690, latitude: 5.35357},
		{longitude: -3.97467, latitude: 5.34550},
		{longitude: -3.97656, latitude: 5.33614, speed: 27, gps_signal: 'V'},
		{longitude: -3.98076, latitude: 5.33820, speed: 65, gps_signal: 'V'},
		{longitude: -3.98231, latitude: 5.33957, speed: 82},
		{longitude: -3.98162, latitude: 5.33897, speed: 56, gps_signal: 'V'},
		{longitude: -3.98162, latitude: 5.33915},
		{longitude: -3.99119, latitude: 5.33254}
	]
}
