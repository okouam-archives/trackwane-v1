require 'date'

SIMULATION ||= {}
SIMULATION[22222222] = {
  event_interval: 10,
  start_time: DateTime.new(2012, 3, 5, 12, 0, 0),
  realtime_interval: 600, # in sec
  events: [
    {longitude: -4.02370, latitude: 5.33475, speed: 60},
    {longitude: -4.02035, latitude: 5.33604, gps_signal: 'V'},
    {longitude: -4.02048, latitude: 5.33467},
    {longitude: -4.01730, latitude: 5.33904},
    {longitude: -4.01357, latitude: 5.33874},
    {longitude: -3.00975, latitude: 5.33741},
    {longitude: -4.00168, latitude: 5.33578},
    {longitude: -3.99357, latitude: 5.33475, speed: 81, gps_signal: 'V'},
    {longitude: -3.99456, latitude: 5.32999, speed: 75, gps_signal: 'V'},
    {longitude: -3.99688, latitude: 5.32647}
  ]
}