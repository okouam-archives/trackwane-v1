class GeofenceAlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json  do
				account = Account.find(session[:account_id])
        @alarms = account.geofence_alarms
        render json: {success: true, results: @alarms}
      end
    end
  end

  def show
    render :json => GeofenceAlarm.find(params[:id])
  end

  def create
  	changes = params.slice(*GeofenceAlarm.column_names)
		alarm = GeofenceAlarm.new(changes)
    alarm.account = Account.find(session[:account_id])
    if alarm.save
      render json: {success: true, results: [alarm.as_json]}
    else
      render json: alarm.errors, status: 400
    end
  end

  def destroy
    GeofenceAlarm.find(params[:id]).destroy
    render json: {success: true}
  end

end