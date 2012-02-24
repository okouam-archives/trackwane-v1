class EventObserver < ActiveRecord::Observer

  def after_save(event)
    track = event.device.tracks.last
    new_track = Track.from_event(event)
    new_track.alarm = AlarmMonitor.check(event)
    new_track.save! if new_track.in_different_location?(track) || alarm
  end


end