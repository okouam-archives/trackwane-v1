class Geofence < ActiveRecord::Base
  belongs_to :account, :counter_cache => true
  validates_presence_of :name, :coordinates
end