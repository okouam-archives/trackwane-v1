module Warning

  def geofence_crossing?(geofence, event, previous_event)
    within(previous_event, geofence) && outside(event, geofence) ||
      within(event, geofence) && outside(previous_event, geofence)
  end

  def outside(event, zone)
    !within(event, zone)
  end

	def within(event, zone)
		lon = event.longitude
		lat = event.latitude
		sql = "SELECT ST_Contains(ST_GeomFromEWKT('SRID=4326;#{zone}'), ST_GeomFromEWKT('SRID=4326;POINT(#{lat} #{lon})'))"
		ActiveRecord::Base.connection.select_value(sql) == 't'
	end

end