class Account < ActiveRecord::Base
  validates_presence_of :name, :telephone, :contact, :email
  has_many :devices
  has_many :geofences
  has_many :reports
  has_many :places
  has_many :geofence_alarms
  has_many :speed_alarms
  has_many :users
  has_many :groups
  has_many :alerts
  has_many :schedules
end