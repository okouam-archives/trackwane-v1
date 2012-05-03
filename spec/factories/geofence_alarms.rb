FactoryGirl.define do
  factory :geofence_alarm do
    association :account
    sequence(:name) {|n| "Geofence Alarm #{n}"}
    bounds Forgery::Geospatial.wkt_square
  end
end

