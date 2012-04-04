class GeofenceAlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json  do
        render json: current_account.geofence_alarms
      end
    end
  end

  def show
    render :json => GeofenceAlarm.find(params[:id])
  end

  def create
  	changes = params.slice(*GeofenceAlarm.column_names)
		alarm = GeofenceAlarm.new(changes)
    alarm.account = current_account
    if alarm.save
      render json: alarm
    else
      render json: alarm.errors, status: 400
    end
  end

  def destroy
    GeofenceAlarm.find(params[:id]).destroy
    render json: {success: true}
  end

end