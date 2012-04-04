require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe SpeedWarning do

	describe "when checking for triggered alarms" do
		before(:each) do
      @alarm = Factory(:speed_alarm, coordinates: Forgery::Geospatial.square(5, 5, 1).as_text, :speed => 100)
    end
		context "and the event occurs outside the geofence" do
      context "and the alarm is active" do
        before(:each) do
            @alarm.is_active = true
        end
        it "disactivates the alarm" do
          pending
        end
        it "returns nothing" do
          event = Factory.build(:event, :latitude => 0, :longitude => 0, :speed => 50)
          warnings = SpeedWarning.check([@alarm], event)
          warnings.should be_empty
        end
      end
      context "and the alarm is disactivated" do
         before(:each) do
            @alarm.is_active = false
        end
        it "returns nothing" do
          event = Factory.build(:event, :latitude => 0, :longitude => 0, :speed => 50)
          warnings = SpeedWarning.check([@alarm], event)
          warnings.should be_empty
        end
      end
    end
		context "and the event occurs inside the geofence" do
      context "and the speed limit is breached" do
        context "and the alarm is inactive" do
          it "creates speed warnings" do
            event = Factory.build(:event, :latitude => 2.5, :longitude => 3.5, :speed => 123)
            warnings = SpeedWarning.check([@alarm], event)
            warnings.should_not be_empty
            warnings.size.should == 1
          end
          it "activates the alarm" do
            pending
          end
        end
        context "and the alarm is active" do
           it "creates speed warnings" do
            event = Factory.build(:event, :latitude => 2.5, :longitude => 3.5, :speed => 123)
            warnings = SpeedWarning.check([@alarm], event)
            warnings.should_not be_empty
            warnings.size.should == 1
           end
            it "updates the last occurence timestamp of the alarm" do
              pending
            end
        end
      end
      context "and the speed limit is not breached" do
        context "and the alarm is active" do
          it "disactivates the alarm" do
            pending
          end
          it "returns nothing" do
            event = Factory.build(:event, :latitude => 0, :longitude => 0, :speed => 50)
            warnings = SpeedWarning.check([@alarm], event)
            warnings.should be_empty
          end
        end
        context "and the alarm is disactivated" do
          it "returns nothing" do
            event = Factory.build(:event, :latitude => 0, :longitude => 0, :speed => 50)
            warnings = SpeedWarning.check([@alarm], event)
            warnings.should be_empty
          end
        end
      end

    end

  end

end