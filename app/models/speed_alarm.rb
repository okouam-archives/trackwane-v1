class SpeedAlarm < ActiveRecord::Base
  belongs_to :account
  validates_presence_of :name, :account, :speed
  has_many :alerts, :as => :alertable, :dependent => :destroy

end
