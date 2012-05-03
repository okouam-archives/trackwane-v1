class Place < ActiveRecord::Base
  set_rgeo_factory_for_column(:lonlat, RGeo::Geographic.simple_mercator_factory(:srid => 4326))
  validates_presence_of :name, :category, :lonlat, :account
  belongs_to :account

  scope :within, lambda {|radius, lonlat|
    where("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{lonlat.lon} #{lonlat.lat})'), lonlat) < #{radius}")
      .order("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{lonlat.lon} #{lonlat.lat})'), lonlat)")
  }

end