class ApplicationController < ActionController::Base
  helper_method :current_user, :current_account
  layout "application"

  private

  def current_account
    account_id = session[:account_id]
    account_id ? Account.find(account_id) : nil
  end

  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find

  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end

  def require_user
    unless current_user && current_account
      redirect_to root_url
      false
    else
      gon.current_user = {role: current_user.role, account_id: current_account.id}
    end
  end

  def require_no_user
    if current_user && current_account
      redirect_to login_url
      false
    end
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end

end
