require 'date'

SIMULATION ||= {}
SIMULATION[44444444] = {
	event_interval: 10,
	start_time: DateTime.new(2012, 2, 10, 10, 20, 0),
	realtime_interval: 600, # in sec
	events: [
		{longitude: -3.98849, latitude: 5.30425},
		{longitude: -3.99098, latitude: 5.30854},
		{longitude: -3.99827, latitude: 5.30570},
		{longitude: -4.00333, latitude: 5.30399, speed: 72},
		{longitude: -4.00196, latitude: 5.29867},
		{longitude: -4.01037, latitude: 5.29506},
		{longitude: -4.01698, latitude: 5.30047},
		{longitude: -4.02016, latitude: 5.30313},
		{longitude: -4.01827, latitude: 5.30313, speed: 45, gps_signal: 'V'},
		{longitude: -4.01810, latitude: 5.30304}
	]
}
