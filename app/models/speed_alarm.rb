class SpeedAlarm < ActiveRecord::Base
  belongs_to :account
  validates_presence_of :name, :account, :speed

  def send_email?
    destination =~ /@/
  end

end
