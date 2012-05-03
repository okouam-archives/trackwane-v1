require 'rgeo'
require 'rgeo-activerecord'

class Event < ActiveRecord::Base
  include Geokit::Geocoders
  set_rgeo_factory_for_column(:lonlat, RGeo::Geographic.simple_mercator_factory(:srid => 4326))
  validates_presence_of :device, :lonlat, :speed, :heading, :date
  belongs_to :device
  belongs_to :place
  belongs_to :previous_event, :class_name => "Event"
  has_many :speed_warnings
  has_many :geofence_warnings

  def self.extent(account_id)
    sql = "SELECT ST_Extent(lonlat) from events JOIN devices ON events.device_id = devices.id WHERE account_id = #{account_id}"
    ActiveRecord::Base.connection.select_rows(sql)[0][0]
  end

  def as_json(options = nil)
    hash = super(options)
    hash = add_device_json(hash) if device
    hash[:account_id] = device.account.id
    hash[:warnings] = add_warnings_json(speed_warnings, geofence_warnings) unless speed_warnings.empty? && geofence_warnings.empty?
		hash[:place] = place.as_json if place
    hash
  end

  def within?(bounds)
    bounds ? lonlat.within?(bounds) : false
  end

  def geolocate
    self.place = device.account.places.within(500, lonlat).try(:first)
    self.address = Road.closest(lonlat.lon, lonlat.lat, 20).try(:first).try(:label)
    unless self.address
      geocode = Geokit::Geocoders::GoogleGeocoder.reverse_geocode("#{lonlat.lat},#{lonlat.lon}")
      self.address = geocode.street_name if geocode
    end
  end

  def measure_distance_moved(event)
    return 0 unless event
    lonlat.distance(event.lonlat).round(2)
  end

  private

  def add_warnings_json(speed_warnings, geofence_warnings)
    no_speed_warnings = speed_warnings.empty?
    no_geofence_warnings = geofence_warnings.empty?
    speed_alerts = no_speed_warnings ? [] : speed_warnings.map{|warning| warning.as_json(nil)}
    geofence_alerts = no_geofence_warnings ? [] : geofence_warnings.map{|warning| warning.as_json(nil)}
    {speed: speed_alerts, geofence: geofence_alerts}
  end

  def add_device_json (hash)
    hash[:name] = device.display_name
    hash[:imei] = device.imei_number
    hash
  end

end