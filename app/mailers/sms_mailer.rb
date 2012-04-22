class AlertMailer < ActionMailer::Base
  default :from => 'alerts@trackwane.com'

  def warning_email(alert)
    @alert = alert
    mail(to: "#{alert.destination}@email.smsglobal.com", subject: "EMAIL TO SMS")
  end

end