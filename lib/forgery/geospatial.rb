class Forgery::Geospatial < Forgery

  def self.latitude
    rand(90)
  end

  def self.longitude
    rand(180)
  end

  def self.square(lon = nil, lat = nil, width = nil)
    lon ||= self.longitude
    lat ||= self.latitude
    width ||= 1 + rand(10)
    radius = width / 2.to_f
    geofactory = RGeo::Geographic.simple_mercator_factory
    top_right = geofactory.point(lon + radius, lat + radius)
    top_left =  geofactory.point(lon - radius, lat + radius)
    bottom_right = geofactory.point(lon + radius, lat - radius)
    bottom_left =  geofactory.point(lon - radius, lat - radius)
    geofactory.polygon(geofactory.line_string([top_left, top_right, bottom_right, bottom_left]))
  end

end