class Account < ActiveRecord::Base
  has_many :devices
  has_many :geofences
  has_many :places
  has_many :alarms
  has_many :users
  has_many :groups
end