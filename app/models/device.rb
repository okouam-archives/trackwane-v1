class Device < ActiveRecord::Base
  validates_presence_of :account, :imei_number, :display_name
  has_many :events
  belongs_to :account, :counter_cache => true
end
