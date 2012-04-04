class CreateDailyDistanceEvents < ActiveRecord::Migration
  def up
 sql = %{
  CREATE OR REPLACE VIEW daily_distance_events AS
      WITH distance_events AS (
        SELECT
          events.device_id,
          devices.name as device_name,
          events.distance_delta,
          events.date,
          date_trunc('hour', events.date) + btrim(((15 * (date_part('minute', events.date)::integer / 15))::text) || ' minutes')::interval AS period
        FROM events JOIN devices ON events.device_id = devices.id
      )
      SELECT
        device_id,
        device_name,
        period,
        sum(distance_events.distance_delta) AS value
      FROM
        distance_events
      GROUP BY
        device_id,
        device_name,
        period;
    }
    execute(sql)
  end

  def down
  end
end
