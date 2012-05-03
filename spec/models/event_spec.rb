require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Event do

  before :each do
    @geofactory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
  end

  describe "when geolocating" do

    before :each do
      @event = FactoryGirl.build(:event, :lonlat => @geofactory.point(0, 0))
    end

    it "finds the closest place within a radius of 20m" do
      device = FactoryGirl.create(:device)
      @event.device = device
      place = FactoryGirl.create(:place, account: device.account, :lonlat => @geofactory.point(0.00001, 1))
      @event.geolocate
      @event.place.should == place
    end

    it "ignores places outside a radius of 20m" do
      FactoryGirl.create(:place, :lonlat => @geofactory.point(0.1, 1))
      @event.geolocate
      @event.place.should be_nil
    end

    it "uses the Google reverse geocoder if no roads are found" do
      event = FactoryGirl.build(:event, :lonlat => @geofactory.point(-120.84633, 37.48518))
      event.geolocate
      event.address.should == "5th St"
    end

    it "finds the closest road within a radius of 20m" do
      Road.should_receive(:closest).with(0, 0, 20).and_return(nil)
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
        a = FactoryGirl.create(:event, device: device, :lonlat => @geofactory.point(2, 3))
        b = FactoryGirl.create(:event, device: device, :lonlat => @geofactory.point(3, 4))
        a.save!
        b.save!
        Event.extent(account.id).should == "BOX(2 3,3 4)"
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
          previous_event = FactoryGirl.build(:event, :lonlat => @geofactory.point(0, 0))
          event = FactoryGirl.build(:event, :lonlat => @geofactory.point(0, 0.005))
          event.measure_distance_moved(previous_event).should == 556.6
        end
    end

  end

end