class Road < ActiveRecord::Base
  scope :closest, lambda {|longitude, latitude|
      where("label IS NOT NULL")
        .order("ST_Distance(ST_SetSRID(ST_Point(#{longitude}, #{latitude}), 4326), the_geom)")
  }
end