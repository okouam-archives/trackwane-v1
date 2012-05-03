require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Warning do

  before(:all) do
    @factory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
    @bounds = @factory.parse_wkt "POLYGON((4.5 5.5, 5.5 5.5, 5.5 4.5, 4.5 4.5, 4.5 5.5))"
    @inside_point = FactoryGirl.build(:event, :lonlat => @factory.point(5, 5))
    @outside_point = FactoryGirl.build(:event, :lonlat => @factory.point(0, 0))
  end

  it "recognizes a geofence crossing from inside to outside" do
    SpeedWarning.geofence_crossing? @bounds, @inside_point, @outside_point
  end

  it "recognizes a geofence crossing from outside to inside" do
    SpeedWarning.geofence_crossing? @bounds, @outside_point, @inside_point
  end

  it "ignores movement inside the fence" do
    another_inside_point = @factory.point(5.3, 5.3)
    SpeedWarning.geofence_crossing? @bounds, another_inside_point, @inside_point
  end

  it "ignores movement outside the fence" do
    another_outside_point = @factory.point(2, 2)
    SpeedWarning.geofence_crossing? @bounds, @outside_point, another_outside_point
  end

end