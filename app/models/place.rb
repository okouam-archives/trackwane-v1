class Place < ActiveRecord::Base
  validates_presence_of :name, :category, :longitude, :latitude, :account
  belongs_to :account, :counter_cache => true

  scope :within, lambda {|radius, longitude, latitude|
    where("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{longitude} #{latitude})'), ST_GeographyFromText('SRID=4326;POINT(' || longitude || ' ' || latitude || ')')) < #{radius}")
      .order("ST_Distance(ST_GeographyFromText('SRID=4326;POINT(#{longitude} #{latitude})'), ST_GeographyFromText('SRID=4326;POINT(' || longitude || ' ' || latitude || ')'))")
  }

end