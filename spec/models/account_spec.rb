require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Account do

  it "cannot be saved without a name" do
    account = FactoryGirl.build(:account, :name => nil)
    account.save.should be_false
  end

  it "cannot be saved without a contact" do
    account = FactoryGirl.build(:account, :contact => nil)
    account.save.should be_false
  end

  it "cannot be saved without an email" do
    account = FactoryGirl.build(:account, :email => nil)
    account.save.should be_false
  end

  it "can be saved" do
    account = FactoryGirl.build(:account)
    account.save.should be_true
  end

end