class AccountsController < ApplicationController

  def index
    @accounts = Account.all
    respond_to do |format|
      format.html
      format.json {render json: @accounts}
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