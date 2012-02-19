class HelpController < ApplicationController

  def index
    render params[:section]
  end

end