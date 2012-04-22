FactoryGirl.define do
  factory :speed_warning do
    association :speed_alarm
    association :event
  end
end

