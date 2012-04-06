FactoryGirl.define do
  factory :geofence_alarm do
    association :account
    sequence(:name) {|n| "Geofence Alarm #{n}"}
    coordinates Forgery::Geospatial.square.to_s
  end
end

