class Messenger

  def self.forward(place, lonlat, road, warnings)
    warnings.each do |warning|
      if warning.alarm.destination
        if warning.alarm.send_email?
          AlertMailer.warning_email(warning.alarm, place, lonlat, road)
        else
          SmsMailer.warning_email(warning.alarm, place, lonlat, road)
        end
      end
    end
  end

end