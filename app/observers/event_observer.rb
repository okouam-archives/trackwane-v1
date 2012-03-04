class EventObserver < ActiveRecord::Observer

  def before_save(event)
    device = event.device
    account = device.account
    event.geofence_warnings = GeofenceWarning.check(account.geofence_alarms, event)
    event.speed_warnings =  SpeedWarning.check(account.speed_alarms, event)
		previous_event = device.events.try(:last)
    event.distance_delta = event.measure_distance_moved(previous_event)
    event.place = account.places.within(20, event.longitude, event.latitude).try(:first)
    event.address = Road.closest(event.longitude, event.latitude).try(:first).try(:label)
  end

end