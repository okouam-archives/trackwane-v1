class Geofence < ActiveRecord::Base
  belongs_to :account
  validates_presence_of :name, :coordinates
end