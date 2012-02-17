class DevicesController < ApplicationController
  before_filter :require_user

  def index
    account_id = params[:account_id]
    @devices = account_id ? Account.find(account_id).devices : current_user.account.devices
    respond_to do |format|
      format.html
      format.json do
        results = @devices.as_json(:include => [:group], :computed => ["group_name"])
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

  def events
    device = Device.find(params[:id])
    render :json => device.events
  end

  def poll
    device = Device.find(params[:id])
    render :json => device.events.last
  end

  private

  def persist(device, params)
    device.group = find_group(params)
    if device.update_attributes(params.slice(Device.column_names))
      render json: {success: true, results: [device.as_json(:include => [:group], :computed => ["group_name"])]}
    else
      render json: {success: false}
    end
  end

  def find_group(params)
    group_name = params.delete(:group_name) || "Default"
    Group.find_or_create_by_name(name: group_name, account_id: params[:account_id])
  end

end
