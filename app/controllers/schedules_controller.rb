class SchedulesController < ApplicationController
  before_filter :require_user

  def index
    @account_id = session[:account_id]
    @schedules = Account.find(@account_id).schedules
    respond_to do |format|
      format.html
      format.json do
        results = @schedules
        render json: {success: true, results: results}
      end
    end
  end

end