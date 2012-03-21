class Schedule < ActiveRecord::Base
  belongs_to :report
  validates_presence_of :email, :format, :frequency, :report

end
