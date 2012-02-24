class AlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json  do
        @alarms = Account.find(session[:account_id]).alarms
        render json: {success: true, results: @alarms}
      end
    end
  end

  def create
    changes = params.slice(*Alarm.column_names)
    alarm = Alarm.new(changes)
    alarm.account = Account.find(session[:account_id])
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