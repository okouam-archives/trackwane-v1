class GeofenceAlarm < ActiveRecord::Base
  set_rgeo_factory_for_column(:bounds, RGeo::Geographic.simple_mercator_factory(:srid => 4326))
  validates_presence_of :name, :account, :bounds
  belongs_to :account

  def send_email?
    destination =~ /@/
  end

end
