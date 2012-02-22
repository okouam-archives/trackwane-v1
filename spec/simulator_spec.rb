require File.expand_path(File.dirname(__FILE__) + '/spec_helper')

describe Simulator do

  describe "when parsing" do

    it "discards the non-data parts of the request" do
      entry = "[INFO_|12/16 16:09:59|TrackClientPacketHandler.getHandlePacket:371] Recv[TXT]: $POS,270110,135750.000,A,0519.8264,N,00401.3699,W,0.26,349.45,161211,,,A/00000,00000/0,0,0,0/309900/#"
      Simulator.new.parse(entry).should == "$POS,270110,135750.000,A,0519.8264,N,00401.3699,W,0.26,349.45,161211,,,A/00000,00000/0,0,0,0/309900/#"
    end

  end

end






