require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Event do

  describe "when geolocating" do

    before :each do
      @event = FactoryGirl.build(:event, longitude: 0, latitude: 1)
    end

    it "finds the closest place within a radius of 20m" do
      account = FactoryGirl.create(:account)
      device = FactoryGirl.create(:device, account: account)
      @event.device = device
      place = FactoryGirl.create(:place, account: account, longitude: 0.00001, latitude: 1)
      @event.geolocate
      @event.place.should == place
    end

    it "ignores places outside a radius of 20m" do
      FactoryGirl.create(:place, longitude: 0.1, latitude: 1)
      @event.geolocate
      @event.place.should be_nil
    end

    it "uses the Google reverse geocoder if no roads are found" do
      event = FactoryGirl.build(:event, longitude: -120.84633, latitude: 37.48518)
      event.geolocate
      debugger
      puts event.address.should == "660 5th St, Turlock, CA 95380, USA"
    end

    it "finds the closest road within a radius of 20m" do
      Road.should_receive(:closest).with(0, 1, 20).and_return(nil)
      @event.geolocate
    end

  end

  describe "when getting the extent of the events" do

    context "and there are no events" do

      it "defaults to an extent showing west africa" do
        account = FactoryGirl.create(:account)
        Event.extent(account.id).should be_nil
      end

    end

    context "and there is at least one event" do

      it "finds the extent for all the events" do
        account = FactoryGirl.create(:account)
        device = FactoryGirl.create(:device, account: account)
        a = FactoryGirl.create(:event, device: device, longitude: 1, latitude: 2)
        b = FactoryGirl.create(:event, device: device, longitude: 3, latitude: 4)
        a.save!
        b.save!
        Event.extent(account.id).should == "BOX(2 1,4 3)"
      end

    end

  end

  describe "when converting to json" do

    before(:each) do
      device = FactoryGirl.build(:device, display_name: "Test A", imei_number: "4848443")
      @event = FactoryGirl.build(:event, device: device)
    end

    it "includes information about the associated device" do
      json = @event.as_json
      json[:name].should == "Test A"
      json[:imei].should == "4848443"
    end

    it "sets the account ID" do
      json = @event.as_json
      json[:account_id] = @event.device.account.id
    end

    it "includes any speed warnings" do
      @event.speed_warnings = [FactoryGirl.build(:speed_warning, event: @event)]
      @event.geofence_warnings = [FactoryGirl.build(:geofence_warning, event: @event)]
      json = @event.as_json
      json[:warnings].size.should == 2
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
        it "measures the distance from the previous event in meters" do
          previous_event = FactoryGirl.build(:event, :longitude => 0, :latitude => 0)
          event = FactoryGirl.build(:event, :longitude => 0, :latitude => 0.005)
          event.measure_distance_moved(previous_event).should == 556.6
        end
    end

  end

end