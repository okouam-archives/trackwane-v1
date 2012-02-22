require File.expand_path(File.dirname(__FILE__) + '/spec_helper')

describe Parser do

  before(:all) do
    @data = "$POS,1234567,041914.000,A,0524.0663,N,00400.1690,W,0.07,40.48,150112,,,A/00000,00000/0,0,0,0/1204100/"
    @parser = Parser.new
  end

  describe "when analyzing longitude data" do

    it "correctly identifies positive coordinates" do
      pending
    end

    it "correctly identifies negative coordinates" do
      pending
    end

  end

  describe "when analyzing latitude data" do

    it "correctly identifies positive coordinates" do
      pending
    end

    it "correctly identifies negative coordinates" do
      pending
    end

  end

  describe "when analyzing dates" do

  end

  describe "when analying time" do

  end

  describe "when reading data" do

    it "correctly identifies the IMEI" do
      pending
    end

    it "correctly identifies the longitude" do
      event = @parser.read(@data)
      event.longitude.should == -4
    end

    it "correctly identifies the latitude" do
      event = @parser.read(@data)
      event.latitude.should == 5.4
    end

    it "correctly identifies the heading" do
      event = @parser.read(@data)
      event.heading.should == 40.48
    end

    it "correctly identifies the speed" do
      event = @parser.read(@data)
      event.speed.should == 0.07
    end

    it "correctly identifies the date" do
      event = @parser.read(@data)
      event.date == "150112"
    end

    it "correctly identifies the time" do
      event = @parser.read(@data)
      event.time == "041914.000"
    end

    it "correctly identifies the timestamp" do
      event = @parser.read(@data)
      event.gps_signal.should be_true
    end

  end

end