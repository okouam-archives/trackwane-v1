class EventsController < ApplicationController
  before_filter :require_user, :except => [:create]

  def index
    device_id = params[:device_id]
    events = Device.find(device_id).events
    respond_to do |format|
      format.html
      format.json do
        render json: {success: true, results: events}
      end
    end
  end

  def create
    data = params[:data]
    event = Parser.new.read(data)
    event.device = Device.find_by_imei_number(event.imei_number)
    if event.device
      event.save!
    end
    head :ok
  end

end
