class GeofenceWarning < ActiveRecord::Base
  extend Warning
  validates_presence_of :event, :geofence_alarm
  belongs_to :event
  belongs_to :geofence_alarm

	def as_json(options)
		hash = super(options)
		hash["alarm_name"] = geofence_alarm.name
		hash
	end

	def self.check(alarms, previous_event, event)
		triggered_alarms = alarms.find_all do |alarm|
			geofence_crossing?(alarm.coordinates, event, previous_event)
		end
		triggered_alarms = [triggered_alarms] if triggered_alarms.is_a? GeofenceAlarm
		triggered_alarms ? create_warnings(triggered_alarms, event) : []
	end

  def self.create_warnings(alarms, event)
    alarms.map {|alarm| GeofenceWarning.new({geofence_alarm: alarm, event: event})}
  end

end

