class Account < ActiveRecord::Base
  has_many :devices, :counter_cache => true
  has_many :geofences, :counter_cache => true
  has_many :places, :counter_cache => true
  has_many :alarms, :counter_cache => true
  has_many :users, :counter_cache => true
  has_many :groups
end