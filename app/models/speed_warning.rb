class SpeedWarning < ActiveRecord::Base
  extend Warning
  validates_presence_of :event, :speed_alarm
  belongs_to :event
  belongs_to :speed_alarm

	def as_json(options)
		hash = super(options)
		hash["alarm_name"] = speed_alarm.name
		hash
	end

	def self.check(alarms, event)
    geofactory = RGeo::Geographic.spherical_factory
    warnings = []
		alarms.each do |alarm|
      bounds = geofactory.parse_wkt(alarm.coordinates)
			if within(event, bounds) && alarm.speed < event.speed && !alarm.is_active
        alarm.is_active = true
        alarm.save!
        warnings << SpeedWarning.new({speed_alarm: alarm, event: event})
      elsif outside(event, bounds) && alarm.is_active
        alarm.is_active = false
        alarm.save!
      end
    end
    warnings
	end

end
