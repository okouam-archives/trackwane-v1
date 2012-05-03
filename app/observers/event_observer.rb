class EventObserver < ActiveRecord::Observer

  def before_save(event)
		previous_event = event.device.events.try(:last)
    event.geolocate
    if previous_event
      event.previous_event = previous_event
      check_alarms(event)
      event.distance_delta = event.measure_distance_moved(previous_event)
    end
  end

  def after_save(event)
    Pusher["#{event.device.account.id}-#{event.device.id}"].trigger!('event-received', event.as_json)
  end

  private

  def check_alarms(event)
    account = event.device.account
    address = event.address
    event.geofence_warnings = GeofenceWarning.check(account.geofence_alarms, event.previous_event, event)
    Messenger.forward(event.place, event.lonlat, address, event.geofence_warnings) unless event.geofence_warnings.empty?
    event.speed_warnings =  SpeedWarning.check(account.speed_alarms, event)
    Messenger.forward(event.place, event.lonlat, address, event.speed_warnings) unless event.speed_warnings.empty?
  end

end