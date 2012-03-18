class AlarmsController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
    end
  end

end