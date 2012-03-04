FactoryGirl.define do
  factory :event do
    association :device
    heading {rand(360)}
    speed {rand(120)}
    longitude Forgery::Geospatial.longitude
    latitude Forgery::Geospatial.latitude
    date DateTime.now
  end
end