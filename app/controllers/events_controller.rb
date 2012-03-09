class EventsController < ApplicationController
  before_filter :require_user, :except => [:create]

  def index
    respond_to do |format|
      format.html
      format.json do
        device_id = params[:device_id]
        device = Device.find(device_id)
        events = device.events
        events = events.limit(params[:limit]) if params[:limit]
        events = events.offset(params[:start]) if params[:start]
        render json: {success: true, results: events, total: device.events.count}
      end
    end
  end

  def create
    data = params[:data]
		if data.delete(:simulated)
			imei_number = data.delete(:imei_number)
			event = Event.new(data)
		else
			payload = Parser.new.read(data)
			event = payload.event
			imei_number = payload.imei_number
		end
    event.device = Device.find_by_imei_number(imei_number)
    if event.device
      event.save!
    end
    head :ok
  end

end
