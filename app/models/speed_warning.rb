class SpeedWarning < ActiveRecord::Base
  validates_presence_of :event, :speed_alarm
  belongs_to :event
  belongs_to :speed_alarm

	def as_json(options)
		hash = super(options)
		hash["alarm_name"] = speed_alarm.name
		hash
	end

  def self.check(alarms, event)
    triggered_alarms = alarms.find_all {|alarm| alarm.speed < event.speed}
		triggered_alarms = [triggered_alarms] if triggered_alarms.is_a? SpeedAlarm
		triggered_alarms ? triggered_alarms.map {|alarm| SpeedWarning.new({speed_alarm: alarm, event: event})} : []
  end

end
