class AccountsController < ApplicationController
  before_filter :require_user

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
    client = Account.new
    persist(client, params)
  end

  def update
    client = Account.find(params[:id])
    persist(client, params)
  end

  private

  def persist(client, params)
    changes = params.slice(*Account.column_names)
    if client.update_attributes(changes)
      render json: client
    else
      render json: client.errors, status: 401
    end
  end

end