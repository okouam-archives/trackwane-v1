require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Event do

  describe "when calculating a straight path" do

  end

  describe "when finding the orientation along a path" do

  end

  describe "when converting to json" do

    it "includes any warnings" do
      pending
    end

    it "includes the device details" do
      pending
    end

    it "includes the path" do
      pending
    end

    it "includes the path orientation" do
      pending
    end

  end

  describe "when measuring the distance moved" do

    context "and there are no previous events" do

      it "returns 0 as the distance moved" do
        event = FactoryGirl.build(:event)
        event.measure_distance_moved(nil).should == 0
      end

    end

    context "and there is a previous event" do
        it "measures the distance from the previous event" do
          previous_event = FactoryGirl.build(:event, :longitude => 0, :latitude => 0)
          event = FactoryGirl.build(:event, :longitude => 0, :latitude => 0.005)
          event.measure_distance_moved(previous_event).should == 556.5974539663679
        end
    end

  end

end