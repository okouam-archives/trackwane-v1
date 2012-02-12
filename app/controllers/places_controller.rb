class PlacesController < ApplicationController
  before_filter :require_user

  def index
    @places = current_user.account.places
    respond_to do |format|
      format.json {render json: {success: true, results: @places}}
    end
  end

end
