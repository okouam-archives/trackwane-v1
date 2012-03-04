Factory.sequence :geofence_alarm_name do |n|
   "Geofence Alarm #{n}"
end

FactoryGirl.define do
  factory :geofence_alarm do
    association :account
    name Factory.next :geofence_alarm_name
  end
end

