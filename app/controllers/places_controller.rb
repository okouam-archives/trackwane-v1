class PlacesController < ApplicationController
  before_filter :require_user

  def index
    @places = session[:account].places
    respond_to do |format|
      format.html
      format.json {render json: {success: true, results: @places}}
    end
  end

end
