class AccountsController < ApplicationController

  def index
    @accounts = Account.all
    @account_id = session[:account_id]
    respond_to do |format|
      format.html
      format.json {render json: {success: true, results: @accounts}}
    end
  end

  def destroy
    Account.find(params[:id]).destroy
    render json: {success: true}
  end

  def create

  end

  def update

  end

end