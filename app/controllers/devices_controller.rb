class DevicesController < ApplicationController
  before_filter :require_user

  def index
    @devices = current_account.devices
    respond_to do |format|
      format.html
      format.json do
        results = @devices.as_json(:computed => ["group_name"])
        render json: {success: true, results: results}
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

  def poll
    devices = current_account.devices
    render :json => devices.map{|device| device.events.last}.compact
  end

  def destroy
    Device.find(params[:id]).destroy
    render json: {success: true}
  end

  private

  def persist(device, params)
    device.group = find_group(params)
    changes = params.slice(*Device.column_names)
    device.account = current_account unless device.account
    if device.update_attributes(changes)
      render json: {success: true, results: [device.as_json(:computed => ["group_name"])]}
    else
      render json: device.errors, status: 400
    end
  end

  def find_group(params)
    group_name = params.delete(:group_name) || "Default"
    Group.find_or_create_by_name(name: group_name, account_id: params[:account_id])
  end

end
