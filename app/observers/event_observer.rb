class EventObserver < ActiveRecord::Observer

  def before_save(event)
    device = event.device
		previous_event = device.events.try(:last)
    account = device.account
    if previous_event
      event.geofence_warnings = GeofenceWarning.check(account.geofence_alarms, previous_event, event)
      event.speed_warnings =  SpeedWarning.check(account.speed_alarms, event)
      event.distance_delta = event.measure_distance_moved(previous_event)
    end
    event.place = account.places.within(20, event.longitude, event.latitude).try(:first)
    event.address = Road.closest(event.longitude, event.latitude).try(:first).try(:label)
  end

end