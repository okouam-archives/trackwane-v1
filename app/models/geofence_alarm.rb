class GeofenceAlarm < ActiveRecord::Base
  validates_presence_of :name, :account, :category, :coordinates
  belongs_to :account

end
