class AccountsController < ApplicationController

  def index
    gon.accounts = Account.all
    respond_to do |format|
      format.html
      format.json {render json: gon.accounts}
    end
  end

  def show
    @account = current_account
  end

  def current
    @account = current_account
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