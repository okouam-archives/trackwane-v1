class EventsController < ApplicationController
  before_filter :require_user

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

end
