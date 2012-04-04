class PlacesController < ApplicationController
  before_filter :require_user

  def index
    gon.places = current_account.places
    respond_to do |format|
      format.html
      format.json do
        render json: gon.places
      end
    end
  end

  def create
    place = Place.new(params.slice(*Place.column_names))
    place.account = current_account
    if place.save
      render json: place
    else
      render json: place.errors, status: 400
    end
  end

  def destroy
    Place.find(params[:id]).destroy
    render json: {success: true}
  end

end
