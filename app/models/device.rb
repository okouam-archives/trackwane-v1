class Device < ActiveRecord::Base
  validates_presence_of :account
  has_many :events
  belongs_to :account, :counter_cache => true
end
