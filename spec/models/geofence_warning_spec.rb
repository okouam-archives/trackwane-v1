require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GeofenceWarning do

  describe "when checking for triggered alarms" do

    before(:all) do
			account = Factory(:account)
      @alarm = Factory(:geofence_alarm, coordinates: Forgery::Geospatial.square(5, 5, 2).as_text,
                       :account => account, :name => "B")
    end

    context "and both events occur outside the geofence" do
      it "returns nothing" do
        previous_event = Factory.build(:event, :latitude => 15, :longitude => 15)
        event = Factory.build(:event, :latitude => 10, :longitude => 10)
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should be_empty
      end
    end

    context "and both events occur inside the geofence" do
      it "returns nothing" do
        previous_event = Factory.build(:event, :latitude => 5, :longitude => 5)
        event = Factory.build(:event, :latitude => 5.9, :longitude => 5.9)
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should be_empty
      end
    end

    context "and one event occurs inside the geofence while the other occurs outside" do
      it "creates geofence warnings" do
        previous_event = Factory.build(:event, :latitude => 5, :longitude => 5)
        event = Factory.build(:event, :latitude => 0, :longitude => 0)
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should_not be_empty
        warnings.size.should == 1
      end
    end

	end

end