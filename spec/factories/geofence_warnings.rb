FactoryGirl.define do
  factory :geofence_warning do
    association :geofence_alarm
    association :event
  end
end

