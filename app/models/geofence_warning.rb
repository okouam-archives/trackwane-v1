class GeofenceWarning < ActiveRecord::Base
  validates_presence_of :event, :geofence_alarm
  belongs_to :event
  belongs_to :geofence_alarm

	def self.check(alarms, event)
		triggered_alarms = alarms.find_all do |alarm|
			zone = alarm.geofence.coordinates
			alarm.category == "inclusion" ? within(event, zone) : !within(event, zone)
		end
		triggered_alarms = [triggered_alarms] if triggered_alarms.is_a? GeofenceAlarm
		triggered_alarms ? triggered_alarms.map {|alarm| GeofenceWarning.new({geofence_alarm: alarm, event: event})} : []
	end

	def self.within(event, zone)
		lon = event.longitude
		lat = event.latitude
		sql = "SELECT ST_Contains(ST_GeomFromEWKT('SRID=4326;#{zone}'), ST_GeomFromEWKT('SRID=4326;POINT(#{lat} #{lon})'))"
		ActiveRecord::Base.connection.select_value(sql) == 't'
	end

end

