class GroupsController < ApplicationController

  def index
    @groups = current_user.account.groups
    respond_to do |format|
      format.html
      format.json {render json: {success: true, results: @groups}}
    end
  end

end