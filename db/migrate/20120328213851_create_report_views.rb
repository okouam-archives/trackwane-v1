class CreateReportViews < ActiveRecord::Migration
  def up
    sql = %{
      CREATE OR REPLACE VIEW daily_speed_events AS
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

      CREATE OR REPLACE VIEW monthly_speed_events AS
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

      CREATE OR REPLACE VIEW daily_distance_events AS
      WITH distance_events AS (
        SELECT
          events.device_id,
          events.distance_delta,
          events.date,
          date_trunc('hour', events.date) + btrim(((15 * (date_part('minute', events.date)::integer / 15))::text) || ' minutes')::interval AS period
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

      CREATE OR REPLACE VIEW weekly_distance_events AS
      WITH distance_events AS (
        SELECT
          events.device_id,
          events.distance_delta,
          events.date,
          date_trunc('hour', events.date) + btrim(((date_part('hour', events.date)))::text) || ' hours')::interval AS period
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

      CREATE OR REPLACE VIEW monthly_distance_events AS
      WITH distance_events AS (
        SELECT
          events.device_id,
          events.distance_delta,
          events.date,
          date_trunc('hour', events.date) + btrim(((12 * (date_part('hours', events.date)::integer / 12))::text) || ' hours')::interval AS period
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
  end

  def down
  end
end
