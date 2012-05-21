class MapController < ApplicationController
  before_filter :require_user

  def realtime
    gon.devices = current_account.devices.map {|tracker| {display_name: tracker.display_name, account_id: tracker.account.id, id: tracker.id}}
    gon.events = current_account.devices.map {|device| device.events.last}.compact.sort {|a, b| a.device.display_name <=> b.device.display_name}
    gon.extent = Event.extent(current_account.id)
    gon.places = current_account.places.map {|place| place.as_json}
    gon.speed_alarms = current_account.speed_alarms
    gon.geofence_alarms = current_account.geofence_alarms
  end

  def historical
    gon.devices = current_account.devices
  end

end
