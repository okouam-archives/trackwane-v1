FactoryGirl.define do
  factory :device do
    association :account
  end
end

Factory.sequence :device_name do |n|
   n
end