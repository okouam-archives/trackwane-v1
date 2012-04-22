class Messenger

  def self.forward(place, longitude, latitude, road, warnings)
    warnings.each do |warning|
      if warning.alarm.send_email?
        AlertMailer.warning_email(warning.alarm, place, longitude, latitude, road)
      else
        SmsMailer.warning_email(warning.alarm, place, longitude, latitude, road)
      end
    end
  end

end