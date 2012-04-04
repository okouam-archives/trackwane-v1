class SchedulesController < ApplicationController
  before_filter :require_user

  def index
    @schedules = current_account.schedules
    respond_to do |format|
      format.html
      format.json do
        results = @schedules
        render json: {success: true, results: results}
      end
    end
  end

end