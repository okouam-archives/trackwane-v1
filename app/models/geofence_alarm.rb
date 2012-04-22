class GeofenceAlarm < ActiveRecord::Base
  validates_presence_of :name, :account, :coordinates
  belongs_to :account

  def send_email?
    destination =~ /@/
  end

end
