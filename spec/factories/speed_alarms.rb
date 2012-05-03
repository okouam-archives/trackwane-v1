FactoryGirl.define do
  factory :speed_alarm do
    association :account
    speed {rand(100)}
    bounds Forgery::Geospatial.wkt_square
    sequence(:name) {|n| "Speed Alarm #{n}"}
  end
end

