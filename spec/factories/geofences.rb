Factory.sequence :geofence_name do |n|
   "Geofence #{n}"
end

FactoryGirl.define do
  factory :geofence do
    association :account
    name Factory.next :geofence_name
    coordinates Forgery::Geospatial.square
  end
end

