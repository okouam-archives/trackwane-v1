class AlertsController < ApplicationController
  before_filter :require_user

  def index
    @account_id = session[:account_id]
    @alerts = Account.find(@account_id).alerts
    respond_to do |format|
      format.html
      format.json do
        results = @alerts
        render json: {success: true, results: results}
      end
    end
  end

end