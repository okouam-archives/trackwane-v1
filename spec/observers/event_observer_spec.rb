require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe EventObserver do

  it "calculates the distance covered since the last event" do
    device = Factory(:device)
    Factory(:event, :device => device, :longitude => 0, :latitude => 0)
		device.reload
    event = Factory.build(:event, :longitude => 0.005, :latitude => 0.000, :device => device)
    observer = EventObserver.instance
    observer.before_save(event)
    event.distance_delta.should == 556.5974539663679
  end

  it "find the correct address" do
    event = Factory.build(:event, longitude: -4.06395, latitude: 5.34676)
    observer = EventObserver.instance
    observer.before_save(event)
    event.address.should == "Rue P152"
  end

  describe "when the event occurs next to a place" do

    before(:all) do
      @account = Factory(:account, name: "0-One")
      @device = Factory(:device, account: @account)
    end

    context "and the place is within 100m" do
      it "assigns the event to the place" do
        place = Factory(:place, account: @account, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        event = Factory.build(:event, device: @device, longitude: -4.06393, latitude: 5.34676)
        observer = EventObserver.instance
        observer.before_save(event)
        event.place.should == place
      end
    end

    context "and the place is not within 100m" do
      it "does not assign the event to the place" do
        Factory(:place, account: @account, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        event = Factory.build(:event, device: @device, longitude: 0.06393, latitude: 0.34676)
        observer = EventObserver.instance
        observer.before_save(event)
        event.place.should be_nil
      end
    end

  end

end