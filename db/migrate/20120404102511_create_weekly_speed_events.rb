class CreateWeeklySpeedEvents < ActiveRecord::Migration
  def up
    sql = %{
      CREATE OR REPLACE VIEW weekly_speed_events AS
      WITH speed_events AS (
        SELECT
          events.device_id,
          events.speed,
          events.date,
          date_trunc('hour'::text, events.date) + btrim(((15 * (date_part('minute'::text, events.date)::integer / 15))::text) || ' minutes'::text)::interval AS period
        FROM events
      )
      SELECT
        speed_events.device_id,
        speed_events.period,
        max(speed_events.speed) AS data_point
      FROM
        speed_events
      GROUP BY
        speed_events.device_id,
        speed_events.period;
    }
    execute(sql)
  end

  def down
  end
end
