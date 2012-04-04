class PlacesController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json do
        @places = current_account.places
        render json: {success: true, results: @places}
      end
    end
  end

  def create
    changes = params.slice(*Place.column_names)
    place = Place.new(changes)
    place.account = current_account
    if place.save
      render json: place.as_json
    else
      render json: place.errors, status: 400
    end
  end

  def destroy
    Place.find(params[:id]).destroy
    render json: {success: true}
  end

end
