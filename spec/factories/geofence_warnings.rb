FactoryGirl.define do
  factory :geofence_warning do
    association :alarm, :factory => :geofence_alarm
    association :event
  end
end

