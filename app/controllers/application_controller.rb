class ApplicationController < ActionController::Base
  protect_from_forgery
  #before_filter :require_user
  helper_method :current_user
  layout "application"

  private

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find

  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end

  def require_user
    unless current_user
      redirect_to new_user_session_url
      false
    end
  end

end
