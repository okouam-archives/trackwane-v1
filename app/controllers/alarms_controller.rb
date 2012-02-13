class AlarmsController < ApplicationController
  before_filter :require_user

  def index
    @alarms = current_user.account.alarms
    respond_to do |format|
      format.html
      format.json {render json: {success: true, results: @alarms}}
    end
  end

end