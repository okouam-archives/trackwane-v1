require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Device do

  it "cannot be saved without an account" do
    device = FactoryGirl.build(:device, :account => nil)
    device.save.should be_false
  end

  it "cannot be saved without a display name" do
    device = FactoryGirl.build(:device, :display_name => nil)
    device.save.should be_false
  end

  it "cannot be saved without a imei number" do
    device = FactoryGirl.build(:device, :imei_number => nil)
    device.save.should be_false
  end

  it "can be saved" do
    device = FactoryGirl.build(:device)
    device.save.should be_true
  end

end