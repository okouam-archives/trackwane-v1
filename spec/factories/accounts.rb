FactoryGirl.define do
  factory :account do
    name {Forgery::Name.location}
    telephone {Forgery::Address.phone}
    contact {Forgery::Name.full_name}
    email {Forgery::Email.address}
  end
end