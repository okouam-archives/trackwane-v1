FactoryGirl.define do
  factory :speed_alarm do
    association :account
    speed {rand(100)}
    sequence(:name) {|n| "Speed Alarm #{n}"}
  end
end

