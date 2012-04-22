class Road < ActiveRecord::Base
  scope :closest, lambda {|longitude, latitude, radius|
      where("label IS NOT NULL")
        .where("ST_Distance(ST_SetSRID(ST_Point(#{longitude}, #{latitude}), 4326), the_geom) < #{radius}")
        .order("ST_Distance(ST_SetSRID(ST_Point(#{longitude}, #{latitude}), 4326), the_geom)")
  }
end