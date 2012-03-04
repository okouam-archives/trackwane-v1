Factory.sequence :user_email do |n|
   "email_#{n}@nowhere.com"
end


FactoryGirl.define do
  factory :user do
    role "administrator"
    password Forgery::LoremIpsum.word
    password_confirmation {|u| u.password}
    email {Factory.next(:user_email)}
  end
end