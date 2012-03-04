require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe SpeedWarning do

	describe "when checking for triggered alarms" do

		before(:all) do
			@low_alarm = Factory(:speed_alarm, :speed => 100)
			@high_alarm = Factory(:speed_alarm, :speed => 200)
		end

		context "and there are no triggered alarms" do
			it "returns nothing" do
				event = Factory.build(:event, :latitude => 0, :longitude => 0, :speed => 50)
				warnings = SpeedWarning.check([@high_alarm, @low_alarm], event)
				warnings.should be_empty
			end
		end

		context "and there are triggered alarms" do
			it "creates speed warnings" do
				event = Factory.build(:event, :latitude => 2.5, :longitude => 3.5, :speed => 123)
				warnings = SpeedWarning.check([@high_alarm, @low_alarm], event)
				warnings.should_not be_empty
				warnings.size.should == 1
			end
		end

	end

end