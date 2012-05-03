require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Place do

  it "cannot be saved without an account" do
    place = FactoryGirl.build(:place, :account => nil)
    place.save.should be_false
  end

  it "cannot be saved without a lonlat" do
    place = FactoryGirl.build(:place, :lonlat => nil)
    place.save.should be_false
  end

  it "cannot be saved without a name" do
    place = FactoryGirl.build(:place, :name => nil)
    place.save.should be_false
  end

  it "cannot be saved without a category" do
    place = FactoryGirl.build(:place, :category => nil)
    place.save.should be_false
  end

  it "can be saved" do
    place = FactoryGirl.build(:place)
    place.save.should be_true
  end

  it "cannot be saved without a lonlat" do
    place = FactoryGirl.build(:place)
    debugger
    json = place.as_json
  end


  describe "when finding the closest place to a point" do

    before(:all) do
      @geofactory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
      Place.delete_all
    end

    context "and there are no places in the database" do
      it "finds nothing" do
        point = @geofactory.point(0, 0)
        Place.within(1000, point).should be_empty
      end
    end

    context "and there are no places in the desired range" do
      it "finds nothing" do
        FactoryGirl.create(:place, :lonlat => 'SRID=4326;POINT(-4.06390 5.34670)', :category => "Pubs")
        point = @geofactory.point(0, 0)
        Place.within(100, point).should be_empty
      end
    end

    context "and there is a single place in the desired range" do
      it "finds the single place" do
        place = FactoryGirl.create(:place, lonlat: 'SRID=4326;POINT(-4.06390 5.34670)', :category => "Pubs")
        point = @geofactory.point(-4.06395, 5.34666)
        Place.within(20, point).should == [place]
      end
    end

    context "and there are multiple places in the desired range" do
      it "orders the places by distance from the original coordinates" do
        FactoryGirl.create(:place, lonlat: 'SRID=4326;POINT(-4.06395 5.34675)', :category => "Pubs", :name => "King Tavern")
        FactoryGirl.create(:place, lonlat: 'SRID=4326;POINT(-4.06390 5.34670)', :category => "Pubs", :name => "Duke of Gloucester")
        point = @geofactory.point(-4.06392, 5.34666)
        Place.within(20, point).first.name.should == "Duke of Gloucester"
      end

    end
  end

end