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

  def create
    alert = Alert.new(params.slice(*Alert.column_names))
    alert.account_id = session[:account_id]
    if alert.save
       render json: alert.as_json
    else
      render json: alert.errors
    end
  end

  def destroy
    Alert.find(params[:id]).destroy
    render json: {success: true}
  end


end