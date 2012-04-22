require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Place do

  describe "when finding the closest place to a point" do

    before(:all) do
      Place.delete_all
    end

    context "and there are no places in the database" do
      it "finds nothing" do
        Place.within(1000, 0, 0).should be_empty
      end
    end

    context "and there are no places in the desired range" do
      it "finds nothing" do
        FactoryGirl.create(:place, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        Place.within(100, 0, 0).should be_empty
      end
    end

    context "and there is a single place in the desired range" do
      it "finds the single place" do
        place = FactoryGirl.create(:place, longitude: -4.06390, latitude: 5.34670, :category => "Pubs")
        Place.within(20, -4.06395, 5.34666).should == [place]
      end
    end

    context "and there are multiple places in the desired range" do
      it "orders the places by distance from the original coordinates" do
        FactoryGirl.create(:place, longitude: -4.06395, latitude: 5.34675, :category => "Pubs", :name => "King Tavern")
        FactoryGirl.create(:place, longitude: -4.06390, latitude: 5.34670, :category => "Pubs", :name => "Duke of Gloucester")
        Place.within(20, -4.06392, 5.34666).first.name.should == "Duke of Gloucester"
      end

    end
  end

end