class AlertMailer < ActionMailer::Base
  default :from => 'alerts@trackwane.com'

  def warning_email(alert)
    @alert = alert
    mail(to: alert.destination, subject: "Your device #{alert.device.name} has raised an alert!")
  end

end