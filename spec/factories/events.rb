FactoryGirl.define do
  factory :event do
    association :device
    heading {rand(360)}
    speed {rand(120)}
    lonlat Forgery::Geospatial.wkt_point
    date DateTime.now
  end
end