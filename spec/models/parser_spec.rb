require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Parser do

  before(:all) do
    @data = "$POS,1234567,041914.000,A,0524.0663,N,00400.1690,W,0.07,40.48,150112,,,A/00000,00000/0,0,0,0/1204100/"
    @parser = Parser.new
  end

  describe "when reading data" do

    it "correctly identifies the longitude" do
      result = @parser.read(@data)
      result[:event].longitude.should == -4
    end

    it "correctly identifies the latitude" do
      result = @parser.read(@data)
      result[:event].latitude.should == 5.4
    end

    it "correctly identifies the heading" do
      result = @parser.read(@data)
      result[:event].heading.should == 40.48
    end

    it "correctly identifies the speed" do
      result = @parser.read(@data)
      result[:event].speed.should == 0.07
    end

    it "correctly identifies the date" do
      result = @parser.read(@data)
      result[:event].date == "150112"
    end

    it "correctly identifies the timestamp" do
      result = @parser.read(@data)
      result[:event].gps_signal.should be_true
    end

  end

end