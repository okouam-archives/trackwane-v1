class Place < ActiveRecord::Base
  validates_presence_of :name, :category, :longitude, :latitude, :account
  belongs_to :account, :counter_cache => true
  acts_as_mappable :lat_column_name => :latitude,
                   :units => :km,
                   :lng_column_name => :longitude

  scope :within, lambda {|radius, longitude, latitude|
    where("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{longitude} #{latitude})'), ST_GeographyFromText('SRID=4326;POINT(' || longitude || ' ' || latitude || ')')) < #{radius}")
      .order("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{longitude} #{latitude})'), ST_GeographyFromText('SRID=4326;POINT(' || longitude || ' ' || latitude || ')'))")
  }

end