FactoryGirl.define do
  factory :place do
    association :account
    name Forgery::Name.location
    category Forgery::Name.industry
    longitude Forgery::Geospatial.longitude
    latitude Forgery::Geospatial.latitude
  end
end