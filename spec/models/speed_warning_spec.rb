require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe SpeedWarning do

  it "can be saved" do
    warning = FactoryGirl.build(:speed_warning)
    warning.save.should be_true
  end

  it "cannot be saved without an alarm" do
    warning = FactoryGirl.build(:speed_warning, alarm: nil)
    warning.save.should be_false
  end

  it "cannot be saved without an event" do
    warning = FactoryGirl.build(:speed_warning, event: nil)
    warning.save.should be_false
  end

  describe "when converting to json" do

    it "includes the name of the speed alarm" do
      alarm = FactoryGirl.build(:speed_alarm, :name => "AXB")
      warning = FactoryGirl.build(:speed_warning, :alarm => alarm)
      warning.as_json(nil)["alarm_name"].should == "AXB"
    end

  end

  describe "when checking for triggered alarms" do

    before(:each) do
      geofactory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
      bounds = Forgery::Geospatial.wkt_square(geofactory.point(5, 5, 2))
      @alarm = FactoryGirl.create(:speed_alarm, bounds: bounds, :speed => 100)
    end

    context "and the event occurs outside the geofence" do

      it "returns nothing" do
        @event = FactoryGirl.build(:event, :lonlat => 'POINT(0 0)', :speed => 50)
        warnings = SpeedWarning.check([@alarm], @event)
        warnings.should be_empty
      end
    end

    context "and the event occurs inside the geofence" do

      context "and the speed limit is breached" do

        before(:each) do
          @event = FactoryGirl.build(:event, :lonlat => 'POINT(5 5)', :speed => 123)
        end

        it "creates speed warnings" do
          warnings = SpeedWarning.check([@alarm], @event)
          warnings.should_not be_empty
          warnings.size.should == 1
        end

      end

      context "and the speed limit is not breached" do

        it "returns nothing" do
          event = FactoryGirl.build(:event, :lonlat => 'POINT(5 5)', :speed => 50)
          warnings = SpeedWarning.check([@alarm], event)
          warnings.should be_empty
        end

      end

    end

  end

end
