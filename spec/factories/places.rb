FactoryGirl.define do
  factory :place do
    name Forgery::Name.location
    category Forgery::Name.industry
    lonlat Forgery::Geospatial.wkt_point
    association :account
  end
end