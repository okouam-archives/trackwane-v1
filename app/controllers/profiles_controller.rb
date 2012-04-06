class ProfilesController < ApplicationController

  def show
    @profile = {language: current_user.language, account: current_account.id}
  end

  def update_profile
    profile = params[:profile]
    user = current_user
    user.language = profile[:language]
    user.account = Account.find(profile[:account])
    user.password = profile[:password]
    user.password_confirmation = profile[:password_confirmation]
    user.save!
    redirect_to "/profile"
  end

end