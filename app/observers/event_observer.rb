class EventObserver < ActiveRecord::Observer

  def before_save(event)

    alarms = event.device.account.alarms

    geofence_alarms = alarms.where("category = 'geofence' AND ST_Within(ST_GeomFromKML(rule), ST_Point(#{event.longitude}, #{event.latitude}))")

    event.alarm = geofence_alarms.first if geofence_alarms

    speed_alarms = alarms.where("category = 'speed' AND rule::integer < #{event.speed}")
    event.alarm = speed_alarms.first if speed_alarms

    previous_event = event.device.events.last
    event.distance_delta = previous_event ? calculate_distance_covered(event, previous_event) : 0

    event.address = Road
      .where("label IS NOT NULL")
      .order("ST_Distance(ST_SetSRID(ST_Point(#{event.longitude}, #{event.latitude}), 4326), the_geom)").first.label
  end

  private

  def calculate_distance_covered(event, previous_event)
    sql = %{
      SELECT
        ST_Distance(ST_Point(#{event.longitude}, #{event.latitude}), ST_Point(#{previous_event.longitude}, #{previous_event.latitude}))
      FROM
        roads
      WHERE
        label IS NOT NULL
    }
    ActiveRecord::Base.connection.select_value(sql)
  end

end