require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Alert do

  it "can be created for geofence alarms" do
    alarm = FactoryGirl.create(:geofence_alarm)
    alert = Alert.new(alertable: alarm, destination: "nowhere@nowhere.com")
    alert.save.should be_true
  end

  it "can be created for speed alarms" do
    alarm = FactoryGirl.create(:speed_alarm)
    alert = Alert.new(alertable: alarm, destination: "nowhere@nowhere.com")
    alert.save.should be_true
  end

  describe "when converting to json" do

    it "outputs the name of the alarm" do
      alarm = FactoryGirl.create(:geofence_alarm, :name => "X")
      alert = Alert.new(alertable: alarm, destination: "nowhere@nowhere.com")
      json = alert.as_json
      json[:alarm_name].should == "X"
    end

  end

end