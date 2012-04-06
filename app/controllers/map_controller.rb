class MapController < ApplicationController
  before_filter :require_user

  def realtime
    gon.events = current_account.devices.map {|device| device.events.last}.compact
  end

  def historical
    gon.devices = current_account.devices
  end

end
