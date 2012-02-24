class UserSessionsController < ApplicationController
  before_filter :require_user, :only => [:destroy]
  before_filter :require_no_user, :only => [:new, :create]

  def new
    @user_session = UserSession.new
    render :layout => false
  end

  def create
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
      if @user_session.user.status == "active"
        session[:account_id] = @user_session.user.account.id
        Rails.logger.info "INFO: Using account ID #{session[:account_id]}"
        redirect_back_or_default '/map/realtime'
      else
        @user_session.errors.add(:base, "Invalid credentials")
        render :action => :new, :layout => false
      end
    else
      render :action => :new, :layout => false
    end
  end

  def destroy
    current_user_session.destroy
    redirect_back_or_default new_user_session_url
  end

  def show
    redirect_to new_user_session_url
  end

end
