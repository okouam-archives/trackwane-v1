# coding: utf-8

class GeofencesController < ApplicationController
  before_filter :require_user

  def index
    @geofences = current_user.account.geofences
    respond_to do |format|
      format.json {render json: {success: true, results: @geofences}}
    end
  end

end
