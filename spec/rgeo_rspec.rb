require File.expand_path(File.dirname(__FILE__) + '/spec_helper')

describe RGeo do

  it "defines the within? method for points" do
    factory = RGeo::Geographic.simple_mercator_factory(:srid => 4326)
    point = factory.point(0, 0)
    a = factory.point(-1, -1)
    b = factory.point(-1, 1)
    c = factory.point(1, 1)
    d = factory.point(1, -1)
    bounds = factory.polygon(factory.line_string([a, b, c, d]))
    point.within?(bounds).should be_true
  end

end

