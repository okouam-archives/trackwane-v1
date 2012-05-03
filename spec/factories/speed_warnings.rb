FactoryGirl.define do
  factory :speed_warning do
    association :alarm, :factory => :speed_alarm
    association :event
  end
end

