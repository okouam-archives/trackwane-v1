class GeofencesController < ApplicationController
  before_filter :require_user

  def index
    @geofences = current_account.geofences
    respond_to do |format|
      format.json {render json: @geofences}
    end
  end

  def create
    geofence = Geofence.new(params.slice(*Geofence.column_names))
    geofence.account = current_account
    if geofence.save
       render json: geofence.as_json
    else
      render json: geofence.errors, status: 401
    end
  end

  def destroy
    Geofence.find(params[:id]).destroy
    render json: {success: true}
  end

end
