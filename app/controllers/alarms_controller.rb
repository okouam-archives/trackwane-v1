class AlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html do
        gon.extent = Event.extent(current_account.id)
      end
    end
  end

end