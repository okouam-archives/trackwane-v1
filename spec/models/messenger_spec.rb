require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Messenger do

  before(:each) do
    ActionMailer::Base.deliveries = []
  end

  describe "when forwarding warnings" do

    context "and the alarm has not destination" do

      it "doesn't forward the alarm'" do
        alarm = FactoryGirl.build(:speed_alarm, :destination => nil)
        warning = FactoryGirl.build(:speed_warning, :alarm => alarm)
        Messenger.forward(nil, nil, nil, [warning])
        ActionMailer::Base.deliveries.should be_empty
      end

    end

    context "and the alarm has a destination"  do

      context "and the destination is an email" do

        it "uses the AlertMailer" do
          alarm = FactoryGirl.build(:speed_alarm, :destination => "someone@somewhere.com")
          warning = FactoryGirl.build(:speed_warning, :alarm => alarm)
          AlertMailer.should_receive(:warning_email)
          Messenger.forward(nil, nil, nil, [warning])
        end

      end

      context "and the destination is a mobile number" do

        it "uses the SmsMailer" do
          alarm = FactoryGirl.build(:speed_alarm, :destination => "0784334744")
          warning = FactoryGirl.build(:speed_warning, :alarm => alarm)
          SmsMailer.should_receive(:warning_email)
          Messenger.forward(nil, nil, nil, [warning])
        end

      end

    end

  end

end