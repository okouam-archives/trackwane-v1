class ReportsController < ApplicationController

  def index
    respond_to do |format|
      format.html do
        @account_id = session[:account_id]
      end
      format.json do
        account_id = session[:account_id]
        @reports = Account.find(account_id).reports
        render json: {success: true, results: @reports}
      end
    end
  end

end
