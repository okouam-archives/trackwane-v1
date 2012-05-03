require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe GeofenceWarning do

  describe "when checking for triggered alarms" do

    before(:all) do
			account = FactoryGirl.create(:account)
      @geofactory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
      bounds = Forgery::Geospatial.wkt_square("POINT(5 5)", 2)
      @alarm = FactoryGirl.create(:geofence_alarm, bounds: bounds, :account => account, :name => "B")
    end

    context "and both events occur outside the geofence" do
      it "returns nothing" do
        previous_event = FactoryGirl.build(:event, :lonlat => @geofactory.point(15, 15))
        event = FactoryGirl.build(:event, :lonlat => @geofactory.point(10, 10))
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should be_empty
      end
    end

    context "and both events occur inside the geofence" do
      it "returns nothing" do
        previous_event = FactoryGirl.build(:event, :lonlat => @geofactory.point(15, 15))
        event = FactoryGirl.build(:event, :lonlat => @geofactory.point(5.9, 5.9))
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should be_empty
      end
    end

    context "and one event occurs inside the geofence while the other occurs outside" do
      it "creates geofence warnings" do
        previous_event = FactoryGirl.build(:event, :lonlat => @geofactory.point(5, 5))
        event = FactoryGirl.build(:event, :lonlat => @geofactory.point(0, 0))
        warnings = GeofenceWarning.check([@alarm], previous_event, event)
        warnings.should_not be_empty
        warnings.size.should == 1
      end
    end

	end

end