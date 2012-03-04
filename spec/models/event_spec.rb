require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Event do

  describe "when measuring the distance moved" do

    context "and there are no previous events" do
      it "returns 0 as the distance moved" do
        event = Factory.build(:event)
        event.measure_distance_moved(nil).should == 0
			end

      context "and there is a previous event" do
        it "measures the distance from the previous event" do
          previous_event = Factory.build(:event, :longitude => 0, :latitude => 0)
          event = Factory.build(:event, :longitude => 0, :latitude => 0.005)
          event.measure_distance_moved(previous_event).should == 556.5974539663679
        end
			end

    end
  end

end