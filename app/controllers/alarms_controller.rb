class AlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json  do
				@account = Account.find(session[:account_id])
        @alarms = @account.geofence_alarms + @account.speed_alarms
        render json: {success: true, results: @alarms}
      end
    end
  end

  def create
		if params[:category] == "geofence"
			changes = params.slice(*GeofenceAlarm.column_names)
			alarm = GeofenceAlarm.new(changes)
		else
			changes = params.slice(*SpeedAlarm.column_names)
			alarm = SpeedAlarm.new(changes)
		end
    alarm.acount = Account.find(session[:account_id])
    if alarm.save
      render json: {success: true, results: [alarm.as_json]}
    else
      render json: {success: false}
    end
  end

  def destroy
    Alarm.find(params[:id]).destroy
    render json: {success: true}
  end

end