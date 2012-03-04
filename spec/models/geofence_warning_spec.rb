require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GeofenceWarning do

  describe "when checking for triggered alarms" do

    before(:all) do
			account = Factory(:account)
      geofence_a = Factory(:geofence, :account => account, coordinates: Forgery::Geospatial.square(0, 0, 1).as_text, :name => "A")
      geofence_b = Factory(:geofence, :account => account, coordinates: Forgery::Geospatial.square(5, 5, 1).as_text, name: "B")
      @inclusion_alarm = Factory(:geofence_alarm, :account => account, :geofence => geofence_a, :category => "inclusion")
      @exclusion_alarm = Factory(:geofence_alarm, :account => account, :geofence => geofence_b, :category => "exclusion")
    end

    context "and there are no triggered alarms" do
      it "returns nothing" do
        event = Factory.build(:event, :latitude => 10, :longitude => 10)
        warnings = GeofenceWarning.check([@inclusion_alarm], event)
        warnings.should be_empty
      end
    end

    context "and there are triggered alarms" do
      it "creates geofence warnings" do
        event = Factory.build(:event, :latitude => 0, :longitude => 0)
        warnings = GeofenceWarning.check([@inclusion_alarm, @exclusion_alarm], event)
        warnings.should_not be_empty
        warnings.size.should == 2
      end
    end

	end

end