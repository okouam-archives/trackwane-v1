FactoryGirl.define do
  factory :place do
    association :account
    name Forgery::Name.location
    longitude Forgery::Geospatial.longitude
    latitude Forgery::Geospatial.latitude
  end
end