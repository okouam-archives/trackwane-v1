class Track < ActiveRecord::Base

  def in_different_location?(other)
    longitude != other.longitude || latitude != other.latitude
  end

  def self.from_event(event)

  end

end