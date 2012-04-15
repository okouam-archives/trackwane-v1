FactoryGirl.define do
  factory :user do
    role "administrator"
    password Forgery::LoremIpsum.word
    password_confirmation {|u| u.password}
    sequence(:email) {|n| "email_#{n}@nowhere.com"}
  end
end