require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GeofenceAlarm do

  it "can be saved" do
    alarm = FactoryGirl.build(:geofence_alarm)
    alarm.save.should be_true
  end

  it "cannot be saved without bounds" do
    alarm = FactoryGirl.build(:geofence_alarm, bounds: nil)
    alarm.save.should be_false
  end

  it "cannot be saved without a name" do
    alarm = FactoryGirl.build(:geofence_alarm, name: nil)
    alarm.save.should be_false
  end

  it "cannot be saved without an  account" do
    alarm = FactoryGirl.build(:geofence_alarm, account: nil)
    alarm.save.should be_false
  end

  describe "when checking whether an email should be sent" do

    it "recognizes emails" do
      alarm = FactoryGirl.build(:geofence_alarm, destination: "okouam@sfsdf.com")
      alarm.send_email?.should be_true
    end

    it "ignores non-emails" do
      alarm = FactoryGirl.build(:geofence_alarm, destination: "456456456")
      alarm.send_email?.should be_false
    end

  end

end