class PlacesController < ApplicationController
  before_filter :require_user

  def index
    respond_to do |format|
      format.html
      format.json do
        @places = Account.find(session[:account_id]).places
        render json: {success: true, results: @places}
      end
    end
  end

  def create
    changes = params.slice(*Place.column_names)
    place = Place.new(changes)
    place.account = Account.find(session[:account_id])
    if place.save
      render json: {success: true, results: [place.as_json]}
    else
      render json: {success: false}
    end
  end

  def destroy
    Place.find(params[:id]).destroy
    render json: {success: true}
  end

end
