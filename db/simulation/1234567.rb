require 'date'

SIMULATION ||= {}
SIMULATION[55676543] = {
	event_interval: 10,
	start_time: DateTime.new(2012, 2, 20, 6, 0, 0),
	realtime_interval: 600, # in sec
	events: [
		{longitude: -4.012917, latitude: 5.304547},
		{longitude: -4.012381, latitude: 5.306128},
		{longitude: -4.009420, latitude: 5.308671},
		{longitude: -4.00839, latitude: 5.310978, speed: 89},
		{longitude: -4.010020, latitude: 5.315743, speed: 93},
		{longitude: -4.011329, latitude: 5.318328, gps_signal: 'V'},
		{longitude: -4.014291, latitude: 5.32352},
		{longitude: -4.017552, latitude: 5.328669},
		{longitude: -4.018496, latitude: 5.334138},
		{longitude: -4.013668, latitude: 5.338539, gps_signal: 'V'},
		{longitude: -4.006802, latitude: 5.33604},
		{longitude: -3.999571, latitude: 5.33542},
		{longitude: -3.996781, latitude: 5.332984},
		{longitude: -4.00088, latitude: 5.331062},
		{longitude: -4.003497, latitude: 5.333198, speed: 79, gps_signal: 'V'},
		{longitude: -4.003497, latitude: 5.333197, speed: 81, gps_signal: 'V'},
		{longitude: -4.003496, latitude: 5.333198, speed: 84},
		{longitude: -4.003496, latitude: 5.333198, speed: 80, gps_signal: 'V'},
		{longitude: -4.003499, latitude: 5.333198, speed: 68},
		{longitude: -4.003496, latitude: 5.333198},
		{longitude: -4.003497, latitude: 5.333194},
		{longitude: -4.003498, latitude: 5.333198},
		{longitude: -4.006029, latitude: 5.330335},
		{longitude: -4.011523, latitude: 5.331425},
		{longitude: -4.006373, latitude: 5.328263},
		{longitude: -3.997618, latitude: 5.32696},
		{longitude: -3.989464, latitude: 5.334651},
		{longitude: -3.982555, latitude: 5.332557},
		{longitude: -3.981911, latitude: 5.331574},
		{longitude: -3.981611, latitude: 5.330677},
		{longitude: -3.978521, latitude: 5.329673}
	]
}
