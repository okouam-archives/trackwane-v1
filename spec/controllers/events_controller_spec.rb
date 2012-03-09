describe EventsController do
  render_views

  describe "POST /events (create)" do

    context "when sending a simulated request" do
      it "creates a new event" do
        pending
      end
    end

    context "when sending a real request" do
      it "parses the request to create a new event" do
        pending
      end
    end

    it "finds the device associated to the event" do
      pending
    end

    context "when there is a device associated to the event" do
      it "save the event" do
        pending
      end
    end

    context "when there is no device associated to the event" do
      it "does not save the event" do
        pending
      end
    end

  end

  describe "GET /events (index)" do

    context "when the request is for a HTML representation" do
      it "renders the view" do
        pending
      end
    end

    context "when the request is for a JSON representation" do
      it "returns the events" do
        pending
      end
      it "returns the total number of events" do
        pending
      end
      it "returns a success status" do
        pending
      end
      context "and the request is for a page of events" do
        it "only returns the request subset of events" do
          pending
        end
      end
    end


  end

end