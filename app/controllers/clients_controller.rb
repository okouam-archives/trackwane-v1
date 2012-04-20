class ClientsController < ApplicationController
  before_filter :require_user

  def index
    gon.clients = Account.all
    respond_to do |format|
      format.html
      format.json {render json: gon.clients}
    end
  end

  def destroy
    Account.find(params[:id]).destroy
    render json: {success: true}
  end

  def update

  end


end