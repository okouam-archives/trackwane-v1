class GeofenceAlarm < ActiveRecord::Base
  validates_presence_of :name, :account, :geofence, :category
  belongs_to :account
  belongs_to :geofence

end
