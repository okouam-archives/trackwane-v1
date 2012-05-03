class SpeedWarning < ActiveRecord::Base
  extend Warning
  validates_presence_of :event, :alarm
  belongs_to :event
  belongs_to :alarm, :class_name => "SpeedAlarm"

	def as_json(options)
		hash = super(options)
		hash["alarm_name"] = alarm.name
		hash
	end

	def self.check(alarms, event)
    warnings = []
		alarms.each do |alarm|
			if event.within?(alarm.bounds) && alarm.speed < event.speed
        alarm.save!
        warnings << SpeedWarning.new({alarm: alarm, event: event})
      elsif !event.within?(alarm.bounds)
        alarm.save!
      end
    end
    warnings
	end

end
