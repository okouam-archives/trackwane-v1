require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Device do

  it "cannot be saved without an account" do
    device = FactoryGirl.build(:device, :account => nil)
    device.save.should be_false
  end

end