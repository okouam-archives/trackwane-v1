class DevicesController < ApplicationController
  before_filter :require_user

  def index
    @devices = current_user.account.devices
    respond_to do |format|
      format.html
      format.json {render json: {success: true, results: @devices}}
    end
  end

  def events
    device = Device.find(params[:id])
    render :json => device.events
  end

  def poll
    device = Device.find(params[:id])
    render :json => device.events.last
  end

end
