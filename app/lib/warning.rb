module Warning

  def geofence_crossing?(geofence, event, previous_event)
    was_inside = previous_event.within?(geofence)
    currently_outside = !event.within?(geofence)
    was_outside = !previous_event.within?(geofence)
    currently_inside = event.within?(geofence)
    (was_inside && currently_outside) || (was_outside && currently_inside)
  end

end