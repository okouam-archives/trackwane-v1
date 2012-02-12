class UsersController < ApplicationController

  def index
    respond_to do |format|
      format.html
      format.json do
        account_id = params[:account_id]
        @users = Account.find(account_id).users
        render json: {success: true, results: @users}
      end
    end
  end

end
