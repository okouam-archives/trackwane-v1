class CreateDailySpeedEvents < ActiveRecord::Migration
    def up
      sql = %{
        CREATE OR REPLACE VIEW daily_speed_events AS
        WITH speed_events AS (
          SELECT
            events.device_id,
            devices.display_name as device_name,
            events.speed,
            events.date,
            date_trunc('hour'::text, events.date) + btrim(((15 * (date_part('minute'::text, events.date)::integer / 15))::text) || ' minutes'::text)::interval AS period
          FROM events events JOIN devices on devices.id = events.device_id
        )
        SELECT
          device_id,
          device_name,
          period,
          max(speed_events.speed) AS data_point
        FROM
          speed_events
        GROUP BY
          speed_events.device_id,
          speed_events.device_name,
          speed_events.period;
      }
      execute(sql)
    end

    def down
    end
  end
