class DevicesController < ApplicationController
  before_filter :require_user

  def index
    gon.devices = current_account.devices
    respond_to do |format|
      format.html
      format.json do
        render json: gon.devices
      end
    end
  end

  def update
    device = Device.find(params[:id])
    persist(device, params)
  end

  def create
    device = Device.new
    persist(device, params)
  end

  def destroy
    Device.find(params[:id]).destroy
    render json: {success: true}
  end

  private

  def persist(device, params)
    changes = params.slice(*Device.column_names)
    device.account = current_account unless device.account
    if device.update_attributes(changes)
      render json: device
    else
      render json: device.errors, status: 400
    end
  end

end
