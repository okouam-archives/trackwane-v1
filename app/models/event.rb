class Event < ActiveRecord::Base
  belongs_to :device
  belongs_to :alarm
  belongs_to :place
end