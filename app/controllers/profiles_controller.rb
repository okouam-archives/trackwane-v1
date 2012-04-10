class ProfilesController < ApplicationController

  def show
    @profile = {language: current_user.language, account: current_account.id}
    @accounts = Account.all
  end

  def update
    profile = params[:profile]
    user = current_user
    user.language = profile[:language]
    user.account = Account.find(profile[:account])
    session[:account_id] = user.account
    if profile[:password] && profile[:password_confirmation]
      user.password = profile[:password]
      user.password_confirmation = profile[:password_confirmation]
    end
    user.save!
    redirect_to "/profile"
  end

end