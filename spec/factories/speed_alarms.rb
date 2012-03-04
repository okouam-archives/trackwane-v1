Factory.sequence :speed_alarm_name do |n|
   "Speed Alarm #{n}"
end

FactoryGirl.define do
  factory :speed_alarm do
    association :account
    speed {rand(100)}
    name Factory.next :speed_alarm_name
  end
end

