require 'rgeo'

class Forgery::Geospatial < Forgery

  def self.wkt_point
    "SRID=4326;POINT(#{rand(180)} #{rand(90)})"
  end

  def self.wkt_square(wkt_point = nil, width = nil)
    wkt_point ||= "POINT(#{rand(180)} #{rand(90)})"
    width ||= 1 + rand(10)
    radius = width / 2.to_f
    geofactory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
    lonlat = geofactory.parse_wkt(wkt_point)
    top_right = geofactory.point(lonlat.lon + radius, lonlat.lat + radius)
    top_left =  geofactory.point(lonlat.lon - radius, lonlat.lat + radius)
    bottom_right = geofactory.point(lonlat.lon + radius, lonlat.lat - radius)
    bottom_left =  geofactory.point(lonlat.lon - radius, lonlat.lat - radius)
    "SRID=4326;" + geofactory.polygon(geofactory.line_string([top_left, top_right, bottom_right, bottom_left])).as_text
  end

end