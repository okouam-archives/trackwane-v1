class MapController < ApplicationController
  before_filter :require_user

  def realtime
    gon.events = current_account.devices.map {|device| device.events.last}.compact.sort {|a, b| a.device.display_name <=> b.device.display_name}
    gon.extent = Event.extent(current_account.id)
  end

  def historical
    gon.devices = current_account.devices
  end

end
