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
		alarms.each do |alarm|
			if within(alarm.coordinates, event) && alarm.speed < event.speed && !alarm.is_active
        alarm.is_active = true
        alarm.save!
        yield SpeedWarning.new({speed_alarm: alarm, event: event})
      elsif outside(alarm.coordinates, event) && alarm.is_active
        alarm.is_active = false
        alarm.save!
      end
    end
	end

end
