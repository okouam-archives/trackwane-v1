FactoryGirl.define do
  factory :device do
    association :account
    sequence(:display_name) {|n| "Device #{n}"}
    imei_number ([*('0'..'9')]).sample(8).join
  end
end