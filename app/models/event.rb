class Event < ActiveRecord::Base
  validates_presence_of :device, :longitude, :latitude, :speed, :heading, :date
  belongs_to :device
  belongs_to :place
  has_many :speed_warnings
  has_many :geofence_warnings

  def as_json(options)
    hash = super(options)
    if device
      hash[:name] = device.display_name
      hash[:imei] = device.imei_number
      hash[:group] = device.group.name
    end
    unless speed_warnings.empty? && geofence_warnings.empty?
      hash[:warnings] = {
        speed: speed_warnings.empty? ? [] : speed_warnings.map{|warning| warning.as_json(options)},
        geofence: geofence_warnings.empty? ? [] : geofence_warnings.map{|warning| warning.as_json(options)}
      }
    end
		hash[:place] = place.try(:to_json) if place
    hash
  end

  def measure_distance_moved(event)
    return 0 unless event
    geofactory = RGeo::Geographic.spherical_factory
    a = geofactory.point(longitude, latitude)
    b = geofactory.point(event.longitude, event.latitude)
    a.distance(b)
  end

end