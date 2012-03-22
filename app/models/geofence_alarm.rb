class GeofenceAlarm < ActiveRecord::Base
  validates_presence_of :name, :account, :category, :coordinates
  belongs_to :account
  has_many :alerts, :as => :alertable, :through => :account

end
