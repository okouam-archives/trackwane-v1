class AlertsController < ApplicationController
  before_filter :require_user

  def index
    gon.alerts = current_account.alerts
    gon.speed_alarms = current_account.speed_alarms
    gon.geofence_alarms = current_account.geofence_alarms
    respond_to do |format|
      format.html
      format.json do
        render json: gon.alerts
      end
    end
  end

  def create
    alert = Alert.new(params.slice(*Alert.column_names))
    alert.account = current_account
    if alert.save
       render json: alert
    else
      render json: alert.errors
    end
  end

  def destroy
    Alert.find(params[:id]).destroy
    render json: {success: true}
  end


end