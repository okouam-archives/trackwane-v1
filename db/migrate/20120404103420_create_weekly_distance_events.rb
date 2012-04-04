class CreateWeeklyDistanceEvents < ActiveRecord::Migration
  def up
    sql = %{
      CREATE OR REPLACE VIEW weekly_distance_events AS
      WITH distance_events AS (
        SELECT
          events.device_id,
          events.distance_delta,
          events.date,
          date_trunc('hour', events.date) + btrim(((date_part('hour', events.date))::text) || ' hours')::interval AS period
        FROM events
      )
      SELECT
        distance_events.device_id,
        distance_events.period,
        sum(distance_events.distance_delta) AS data_point
      FROM
        distance_events
      GROUP BY
        distance_events.device_id,
        distance_events.period;
    }
    execute(sql)
  end

  def down
  end
end
