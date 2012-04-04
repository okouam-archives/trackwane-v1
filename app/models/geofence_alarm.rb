class GeofenceAlarm < ActiveRecord::Base
  validates_presence_of :name, :account, :coordinates
  belongs_to :account
  has_many :alerts, :as => :alertable, :dependent => :destroy

end
