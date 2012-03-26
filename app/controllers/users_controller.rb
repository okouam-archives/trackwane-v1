class UsersController < ApplicationController

  def index
    @account_id = session[:account_id]
    @users = Account.find(@account_id).users
    respond_to do |format|
      format.html
      format.json do
        render json: {success: true, results: @users}
      end
    end
  end

  def change_account
    session[:account_id] = params[:account_id]
    head :ok
  end

  def update
    user = User.find(params[:id])
    persist(user, params)
  end

  def create
    user = User.new
    persist(user, params)
  end

  def destroy
    User.find(params[:id]).destroy
    render json: {success: true}
  end

  private

  def persist(user, params)
    changes = params.slice('login', 'email', 'password', 'password_confirmation', 'role')
    user.account = Account.find(session[:account_id]) unless user.account
    if user.update_attributes(changes)
      render json: {success: true, results: [user.as_json()]}
    else
      render json: user.errors, status: 400
    end
  end

end
